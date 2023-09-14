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

import { selectLoggedInUser, State } from '../../reducers';
import { AuthState } from './ngrx/auth-reducer';
import * as authActions from './ngrx/auth-actions';
import jwt_decode from 'jwt-decode';
import { User } from '../../model/User';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
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

      const decodedToken: any = jwt_decode(token); // Decode the JWT token
      console.log('[AuthGuard]', decodedToken);
  
      //
      const expirationDate = new Date(decodedToken.exp * 1000); // Convert expiration timestamp to a Date object
      console.log(expirationDate);
      // // Check if the token is expired
      if (expirationDate <= new Date()) {
        //   // Token is expired, dispatch a logout action or handle expiration as needed
        this.store.dispatch(authActions.logout());

        return false;
      }
      // this.store.dispatch(authActions.loginSuccess({ user }));
      return true;
    }

    return this.router.createUrlTree(['/auth']);

    // return this.store.select(selectLoggedInUser).pipe(
    //   take(1),
    //   map((user) => {
    //     console.log('[AuthGuard] User: ', user);
    //     const isAuth = !!user;
    //     console.log('isAuth: ', isAuth);
    //     if (isAuth) {
    //       return true;
    //     }
    //     return this.router.createUrlTree(['/auth']);
    //   })
    // );
  }
}
