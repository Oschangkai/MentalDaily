import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth) { 
    this.afAuth.authState.subscribe((data) => {
      console.log(data);
    });
  }

  ngOnInit() {
  }
  emailLogin() {
    this.afAuth.auth.signInWithPopup(new auth.EmailAuthProvider());
  }
  logout() {
    this.afAuth.auth.signOut();
  }

  cardHover(onCard: boolean) {
    let el = document.getElementById("login-card");
    // el.classList.toggle('mat-elevation-z5');
    onCard? el.classList.add('mat-elevation-z3') : el.classList.remove('mat-elevation-z3');
  }

}
