import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this._fb.group({
      'email': ['', [Validators.email, Validators.required]],
      'password': ['', [
        Validators.required,
        Validators.pattern('^([a-zA-Z0-9]+)$'),
        Validators.minLength(6)
      ]]
    });
  }
  registerForm: FormGroup;
}
