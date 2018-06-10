import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, of, from } from 'rxjs';

import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser$ = new BehaviorSubject(null);

  constructor(
    private _afAuth: AngularFireAuth,
    private _router: Router
  ) {
    // 由於這個 Service 會永遠存活，我們不需對她做 unsubscribe
    this._afAuth.authState
      .subscribe(user => {
        if (!user) {
          this._router.navigateByUrl('/login');
        }
        this.currentUser$.next(user);
        console.log(user);
      });
  }

  loginByEmail(email: string, password: string) {
    return from(this._afAuth.auth.signInWithEmailAndPassword(email, password))
      .pipe(catchError((e) => this.handleError(e)))
  }

  // Sends email allowing user to reset password
  resetPassword(oldPassword: string, newPassword: string) {
    // 修改前要再次登入一次
    this.loginByEmail(this._afAuth.auth.currentUser.email, oldPassword)
      .pipe(() => from(
          this._afAuth.auth.currentUser.updatePassword(newPassword)
      ));
  }

  logout() {
    return from(this._afAuth.auth.signOut());
  }


  private handleError(err) {
    console.log(err);
    return of(`Error: ${err}`);
  }
}