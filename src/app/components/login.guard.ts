import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, take } from 'rxjs';

import { selectLoggedInUser, State } from '../reducers';
import jwt_decode from 'jwt-decode';
import { User } from '../model/User';
import * as authActions from './auth/ngrx/auth-actions';


@Injectable({
  providedIn: 'root',
})
export class LoginGuard {
  constructor(private router: Router, private store: Store<State>) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {


    const token = localStorage.getItem('jwtToken'); // Assuming your loginSuccess action provides the token

    if (token) {
      console.log('[Login Auth] : User exists');
      return this.router.createUrlTree(['']);
    }

    return true;
  }

}
