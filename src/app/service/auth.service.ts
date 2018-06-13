import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import { auth as fAuth, User as fUser } from 'firebase';

import { catchError, tap } from 'rxjs/operators';
import { Observable, BehaviorSubject, of, from } from 'rxjs';

import { User } from '../model/user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  fireUser$: Observable<fUser>;
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
        // console.log(user);
        this.returnUrl(user);
      });
  }

  loginByEmail(email: string, password: string) {
    this.storeUrl();
    return from(this._afAuth.auth.signInWithEmailAndPassword(email, password))
      .pipe(
        tap(user => console.log(JSON.stringify(user))),
        catchError(e => this.handleError(e))
      )
  }

  loginByGoogle() {
    this.storeUrl();
    return from(this._afAuth.auth.signInWithPopup( new fAuth.GoogleAuthProvider() ))
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


  private handleError(err) {
    switch(err.code) {
      case "auth/wrong-password":
        return of("密碼錯誤");
      case "auth/user-not-found":
        return of("使用者不存在");
      case "auth/too-many-requests":
        return of("嘗試登入次數過多，請稍後再試");
      case "auth/network-request-failed":
        return of("請檢查網路連線");
    }
    return of(`Error: ${err.code}`);
  }
}