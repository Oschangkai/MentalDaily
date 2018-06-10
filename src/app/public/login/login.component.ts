import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../service/auth.service';

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

  loginForm: FormGroup;

  constructor(public _auth: AuthService, private _fb: FormBuilder) {
    this._auth.logout();
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  loginByEmail() {
    this._auth.loginByEmail(this.email.value, this.password.value);
  }
  logout() {
    this._auth.logout()
  }

  cardHover(onCard: boolean) {
    let el = document.getElementById("login-card");
    // el.classList.toggle('mat-elevation-z5');
    onCard? el.classList.add('mat-elevation-z3') : el.classList.remove('mat-elevation-z3');
  }

}