import { Component, OnInit, Input } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../service/auth.service';
import { MAT_SELECT_SCROLL_STRATEGY_PROVIDER_FACTORY } from '@angular/material';



@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  ngOnInit() {
    this.loginForm = this._fb.group({
      'email': ['', [Validators.email, Validators.required]],
      'password': ['', [
        Validators.required,
        Validators.pattern('^([a-zA-Z0-9]+)$'),
        Validators.minLength(6)
      ]]
    });
  }


  title = ''
  loginForm: FormGroup;

  constructor(public _auth: AuthService, private _fb: FormBuilder) {
    this._auth.logout();
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  loginByEmail() {

    this.title = ''
    if (this.email.valid && this.password.valid) {
      this._auth.loginByEmail(this.email.value, this.password.value);
    }
    else {

      this.title = '驗證失敗'
    }
  }
  logout() {
    this._auth.logout()
  }

  cardHover(onCard: boolean) {
    let el = document.getElementById("login-card");
    // el.classList.toggle('mat-elevation-z5');
    onCard ? el.classList.add('mat-elevation-z3') : el.classList.remove('mat-elevation-z3');
  }

}