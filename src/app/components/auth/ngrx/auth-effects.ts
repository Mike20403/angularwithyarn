import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as authActions from './auth-actions';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../model/User';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.login),
      switchMap(({ email, password }) =>
        this.authService.login(email, password).pipe(
          map((user: User) => {
            console.log(user);
            return authActions.loginSuccess({ user });

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
          const jwtToken = action.user.token;

          // Here, you can set the JWT token in localStorage, sessionStorage, or cookies
          localStorage.setItem('jwtToken', jwtToken);

          // Optionally, you can also navigate to a different route after successful login
          this.router.navigate(['']);
        })
      ),
    { dispatch: false } // This effect does not dispatch any new actions
  );

  constructor(private actions$: Actions, private authService: AuthService,
              private router: Router) {
  }
}
