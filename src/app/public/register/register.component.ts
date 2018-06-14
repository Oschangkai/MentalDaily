import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PasswordValidation } from './passwordValidation';

import { AuthService } from '../../service/auth.service';

import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    public _auth: AuthService,
    private _fb: FormBuilder,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.sending = false;
    this.registerForm = this._fb.group({
      'email': ['', [Validators.email, Validators.required]],
      'password': ['', [
        Validators.required,
        Validators.pattern('^([a-zA-Z0-9]+)$'),
        Validators.minLength(6)
      ]],
      'confirmpassword': ['', [
        Validators.required,
      ]],
    }, {
        validator: PasswordValidation.MatchPassword
      });
  }
  registerForm: FormGroup;
  sending: boolean;

  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get confirmpassword() { return this.registerForm.get('confirmpassword'); }

  signup() {
    if (this.registerForm.valid) {
      this.sending = true;
      this._auth.signUpByEmail(this.email.value, this.password.value)
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

  cardHover(onCard: boolean) {
    let el = document.getElementById("register-card");
    // el.classList.toggle('mat-elevation-z5');
    onCard? el.classList.add('mat-elevation-z3') : el.classList.remove('mat-elevation-z3');
  }

}
