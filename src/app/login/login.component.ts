import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  cardHover(onCard: boolean) {
    let el = document.getElementById("login-card");
    // el.classList.toggle('mat-elevation-z5');
    onCard? el.classList.add('mat-elevation-z3') : el.classList.remove('mat-elevation-z3');
  }

}
