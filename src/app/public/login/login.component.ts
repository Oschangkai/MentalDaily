import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { AuthService } from '../../service/auth.service';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  ngOnInit() {
    this.sending = false;
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
  sending: boolean;

  constructor(
    public _auth: AuthService,
    private _fb: FormBuilder,
    public snackBar: MatSnackBar
  ) {
    this._auth.logout();
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  loginByEmail() {
    if (this.loginForm.valid) {
      this.sending = true;
      this._auth.loginByEmail(this.email.value, this.password.value)
        .subscribe(m => {
          if(typeof(m) === "string") {
            this.snackBar.open(m, '確認');
            this.sending = false;
          } else this.snackBar.dismiss();
        });
    }
    else {
      this.snackBar.open('格式錯誤，請檢查欄位', '確認');
    }
  }
  loginByGoogle() {
    this._auth.loginByGoogle().subscribe();
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