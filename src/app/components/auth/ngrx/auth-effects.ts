import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as authActions from './auth-actions';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthEffects {
  autoLogin$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.autoLogin),
        tap(() => {
          const userData = {};
          const token = localStorage.getItem('jwtToken'); // Assuming your loginSuccess action provides the token
          if (token) {
            const decodedToken: any = jwt_decode(token); // Decode the JWT token
            const expirationDate = new Date(decodedToken.exp * 1000); // Convert expiration timestamp to a Date object
            console.log(expirationDate);
            // Check if the token is expired
            if (expirationDate <= new Date()) {
              // Token is expired, dispatch a logout action or handle expiration as needed
            }
          }
        }),
        switchMap(() => of({ type: 'NO_ACTION' })) // You may need to dispatch a different action or none at all
      ));


  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.login),
      switchMap(({ email, password }) =>
        this.authService.login(email, password).pipe(
          map((response) => {

            return authActions.loginSuccess({ token: response.token });

          }),
          catchError((error) => of(authActions.loginFailure({ error })))
        )
      )
    )
  );
  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.loginSuccess),
        tap((action) => {
          // Assuming you have a token property in the action payload
          const jwtToken = action.token;
          console.log(jwtToken);

          // Here, you can set the JWT token in localStorage, sessionStorage, or cookies
          localStorage.setItem('jwtToken', jwtToken);

          // Optionally, you can also navigate to a different route after successful login
          this.router.navigate(['']);
        })
      ),
    { dispatch: false } // This effect does not dispatch any new actions
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.logout),
        tap((action) => {
          localStorage.removeItem('jwtToken');
        })
      )
    , { dispatch: false });

  constructor(private actions$: Actions, private authService: AuthService,
              private router: Router, private store: Store) {
  }
}
