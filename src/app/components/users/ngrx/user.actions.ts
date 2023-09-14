// user.actions.ts
import { createAction, props } from '@ngrx/store';
import { User } from '../../../model/User';
import { filter } from 'rxjs';

export const loadUsers = createAction('[User] Load Users');
export const loadUsersFailure = createAction('[User] Load Users Failure', props<{ error: string }>());
export const loadUsersSuccess = createAction('[User] Load Users Success', props<{ users: User[] }>());
export const addUser = createAction('[User] Add User', props<{ user: User }>());
export const addUserSuccess = createAction('[User] Add User Success', props<{ user: User }>());
export const addUserFailure = createAction('[User] Add  Users Failure', props<{ error: string }>());
export const updateUser = createAction('[User] Update User', props<{ user: User }>());
export const updateUserSuccess = createAction('[User] Update User Success', props<{ user: User }>());
export const updateUserFailure = createAction('[User] Update Users Failure', props<{ error: string }>());
export const deleteUser = createAction('[User] Delete User', props<{ id: string }>());
export const deleteUserSuccess = createAction('[User] Delete User Success', props<{ id: string }>());
export const deleteUserFailure = createAction('[User] Delete User Failure', props<{ error: string }>());
export const changeFilter = createAction('[User] Change Filter',
  props<{ searchQuery: string, status: string }>()
);

