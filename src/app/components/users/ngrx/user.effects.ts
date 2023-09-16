// user.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { UserService } from '../../../services/user.service';
import * as userActions from './user.actions';
import { User } from '../../../model/User';
import { ActivatedRoute, Router } from '@angular/router';
import {createAction, Store} from '@ngrx/store';
import { State } from '../../../reducers';
import {loadUserByID, loadUserByIDSuccess, loadUsers} from './user.actions';
import {HttpResponse} from "@angular/common/http";

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private userService: UserService,
              private router: Router,
              private route: ActivatedRoute,
              private store: Store<State>) {
  }

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.loadUsers),
      switchMap((payload:{status:string,pageNumber:string,pageSize:string,searchQuery:string}) =>
        this.userService.getUsers(payload).pipe(
          map((response: HttpResponse<User[]>) => {
            // Access the X-Paginator header from the response headers
            const xPaginatorHeader:string = response.headers.get('x-pagination')!;
            const res:{pageNumber:number,pageSize:number,totalPages:number,totalCount:number,hasPrevious:boolean,hasNext:boolean} = JSON.parse(xPaginatorHeader);

            // Do something with xPaginatorHeader here
            return userActions.loadUsersSuccess({users: response.body!, paginator:res})
            // Return the response body (array of users)

          }),
          catchError((error) => of(userActions.loadUsersFailure({ error: error.message }))
        ))
      )
    )
  );
  loadUserByID$ = createEffect(
    () => this.actions$.pipe(
      ofType(userActions.loadUserByID),
      switchMap((payload:{id:string}) => {

          return this.userService.getUserByID(payload).pipe(
            map((user:User) => {
              return userActions.loadUserByIDSuccess({user:user});
            }),
            catchError((error) => of(userActions.loadUserByIDFailure(error)))
          )
      })
    ),
  );
  changeFilter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.changeFilter),
      switchMap((action) => {
        return this.userService.getUsers(action).pipe(
          map((users: any) => {

            return userActions.loadUsersSuccess({ users,paginator:users.paginator })}),
          catchError((error) => of(userActions.loadUsersFailure({ error: error.message })))
        );
      })
    ));

  addUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.addUser),
      switchMap((action: {
          username: string, password: string, firstname: string, lastname: string, phoneNumber: string,
          status: string
        }) =>
          this.userService.addUser(action).pipe(
            map((user: User) => userActions.addUserSuccess({ user })),
            catchError((error) => {
              console.log(error);
              return of(userActions.addUserFailure({ error: error.error.errors[0].message }));
            })
          )
      )
    )
  );

  $addUserSuccess = createEffect(
    () => this.actions$.pipe(
      ofType(userActions.addUserSuccess),
      tap((action) => {
        console.log(action.user.id);
        this.router.navigate(['/users', action.user.id],);
        return of();
      })
    ), { dispatch: false }
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.updateUser),
      switchMap((action) =>
        this.userService.updateUser({ ...action }).pipe(
          map((user: any) => userActions.updateUserSuccess({ user })),
          catchError((error) => of(userActions.updateUserFailure({ error: error.message })))
        )
      )
    )
  );
  updateUserSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(userActions.updateUserSuccess),
        tap((user ) => {
          this.store.dispatch(loadUserByID({id:user.user.id}));

        })
      ), { dispatch: false }
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.deleteUser),
      switchMap((action) =>
        this.userService.deleteUser(action.id).pipe(
          map(() => userActions.deleteUserSuccess({ mess: action.id })),
          catchError((error) => of(userActions.deleteUserFailure({ error: error.message })))
        )
      )
    )
  );
  deleteUserSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(userActions.deleteUserSuccess),
        tap(() => {
          this.router.navigate(['/users']);
        })
      ), { dispatch: false }
  );
}
