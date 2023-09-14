// user.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { UserService } from '../../../services/user.service';
import * as userActions from './user.actions';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private userService: UserService) {
  }

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.loadUsers),
      switchMap(() =>
        this.userService.getUsers().pipe(
          map((users: any) => userActions.loadUsersSuccess({ users })),
          catchError((error) => of(userActions.loadUsersFailure({ error: error.message })))
        )
      )
    )
  );

  changeFilter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.changeFilter),
      switchMap((action) => {
        return this.userService.getFilterUsers(action).pipe(
          map((users: any) => userActions.loadUsersSuccess({ users })),
          catchError((error) => of(userActions.loadUsersFailure({ error: error.message })))
        );
      })
    ));

  addUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.addUser),
      switchMap((action) =>
        this.userService.addUser(action.user).pipe(
          map((user: any) => userActions.addUserSuccess({ user })),
          catchError((error) => of(userActions.addUserFailure({ error: error.message })))
        )
      )
    )
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.updateUser),
      switchMap((action) =>
        this.userService.updateUser(action.user).pipe(
          map((user: any) => userActions.updateUserSuccess({ user })),
          catchError((error) => of(userActions.updateUserFailure({ error: error.message })))
        )
      )
    )
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.deleteUser),
      switchMap((action) =>
        this.userService.deleteUser(action.id).pipe(
          map(() => userActions.deleteUserSuccess({ id: action.id })),
          catchError((error) => of(userActions.deleteUserFailure({ error: error.message })))
        )
      )
    )
  );
}
