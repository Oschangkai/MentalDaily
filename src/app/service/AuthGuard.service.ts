import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivate, CanLoad, CanActivateChild } from '@angular/router';
import { AuthService } from './auth.service';

import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(
    private _auth: AuthService,
    private _router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean| Promise<boolean> {
    return this.isLogin(state.url);
  };

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean| Promise<boolean> {
    return this.isLogin(state.url);
  };

  private isLogin(url: string): Observable<boolean> | Promise<boolean> | boolean {
    return this._auth.fireUser$.pipe(
      take(1),
      map((user) => {
        if (user) return true;

        this._router.navigate(environment.nonAuthenticationUrl, { queryParams: { returnUrl: url } });
        return false;
      })
    )
  }
}