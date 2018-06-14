import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordValidation } from './passwordValidation';
import { AuthService } from '../../service/auth.service';


@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(public _auth: AuthService, private _fb: FormBuilder) {
    this._auth.logout();
  }

  ngOnInit() {
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
        validator: PasswordValidation.MatchPassword // your validation method
      });
  }
  registerForm: FormGroup;

  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get confirmpassword() { return this.registerForm.get('confirmpassword'); }

  signup() {
    this._auth.signUpByEmail(this.email.value, this.password.value).subscribe();
  }

}
