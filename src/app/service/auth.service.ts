import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { catchError } from 'rxjs/operators';
import { Observable, BehaviorSubject, of, from } from 'rxjs';
import { User } from '../model/user.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  fireUser$: Observable<firebase.User>;
  currentUser$ = new BehaviorSubject<User>(null);

  constructor(
    private _afAuth: AngularFireAuth,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.fireUser$ = this._afAuth.authState;
    // 由於這個 Service 會永遠存活，我們不需對她做 unsubscribe
    this._afAuth.authState
      .subscribe(user => {
        this.currentUser$.next(user);
        console.log(user);
        this.returnUrl(user);
      });
  }

  loginByEmail(email: string, password: string) {
    this.storeUrl();
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

  private storeUrl() {
    const returnUrl = this._route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
  }

  private returnUrl(user: User) {
    if (user) {
      const returnUrl = this._route.snapshot.queryParamMap.get('returnUrl') || localStorage.getItem('returnUrl');
      if (returnUrl) {
        this._router.navigateByUrl(returnUrl);
        localStorage.removeItem('returnUrl');
      }
    }
  }


  private handleError(err) {
    console.log(err);
    return of(`Error: ${err}`);
  }
}