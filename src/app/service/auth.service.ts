import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import { auth as fAuth, User as fUser } from 'firebase';

import { catchError, tap, flatMap } from 'rxjs/operators';
import { Observable, BehaviorSubject, of, from } from 'rxjs';
import * as firebase from 'firebase';

import { User, providerData } from '../model/user.model';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  fireUser$: Observable<fUser>;
  currentUser$ = new BehaviorSubject<User>(null);
  // currentUser$ = new BehaviorSubject<fUser>(null);


  constructor(
    private _afAuth: AngularFireAuth,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.fireUser$ = this._afAuth.authState;
    // 由於這個 Service 會永遠存活，我們不需對她做 unsubscribe
    this._afAuth.authState
      .subscribe(user => {
        const u = this.sappy(JSON.stringify(user));
        // console.log(JSON.stringify(u));
        this.currentUser$.next(u);
        this.returnUrl(u);
      });
  }

  loginByEmail(email: string, password: string) {
    this.storeUrl();
    return from(this._afAuth.auth.signInWithEmailAndPassword(email, password))
      .pipe(
        tap(user => console.log("Login Success!")),
        catchError(e => this.handleError(e))
      )
  }

  loginByGoogle() {
    this.storeUrl();
    return from(this._afAuth.auth.signInWithPopup(new fAuth.GoogleAuthProvider()))
      .pipe(
        tap(user => console.log(JSON.stringify(user))),
        catchError(e => this.handleError(e))
      )
  }

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

  signUpByEmail(email: string, password: string) {
    return from(this._afAuth.auth.createUserWithEmailAndPassword(email, password))
      .pipe(
        tap(_ => {
          this.logout();
          this._router.navigateByUrl('/login');
        }),
        catchError(err => this.handleError(err)))
  }

  private storeUrl() {
    const returnUrl = this._route.snapshot.queryParamMap.get('returnUrl') || '/note';
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

  private sappy(s: any): User {
    if(typeof(s)!='undefined' && s && s!='null') {
      s = JSON.parse(s);
      const pd: providerData = {
        uid: s.uid,
        refreshToken: s.stsTokenManager.refreshToken
      };
      var u: User = {
        displayName: s.displayName,
        email: s.email,
        emailVerified: s.emailVerified,
        isAnonymous: s.isAnonymous,
        photoURL: s.photoURL,
        providerData: pd,
        uid: s.uid,
        refreshToken: s.stsTokenManager.refreshToken
      };
      return u;
    }
    return null;
  }


  private handleError(err) {
    switch (err.code) {
      case "auth/wrong-password":
        return of("密碼錯誤");
      case "auth/user-not-found":
        return of("使用者不存在");
      case "auth/too-many-requests":
        return of("嘗試登入次數過多，請稍後再試");
      case "auth/network-request-failed":
        return of("請檢查網路連線");
      case "auth/email-already-in-use":
        return of("使用者已存在");
    }
    return of(`Error: ${err.code}`);
  }

}

