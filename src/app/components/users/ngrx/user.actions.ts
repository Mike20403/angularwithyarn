// user.actions.ts
import { createAction, props } from '@ngrx/store';
import { User } from '../../../model/User';
import { filter } from 'rxjs';


export const loadUserByID = createAction('[User] Load User by ID',
  props<{ id: string }>());
export const loadUserByIDSuccess = createAction('[User] Load User by ID success',
  props<{ user: User }>());
export const loadUserByIDFailure = createAction('[User] Load User by ID Failure',
  props<{ error: string }>());
export const loadUsers = createAction('[User] Load Users',
  props<{pageNumber:string,status:string,pageSize:string,searchQuery:string}>());
export const loadUsersFailure = createAction('[User] Load Users Failure', props<{ error: string }>());
export const loadUsersSuccess = createAction('[User] Load Users Success', props<{ users: User[],paginator:{pageNumber:number,pageSize:number,totalPages:number,totalCount:number,hasPrevious:boolean,hasNext:boolean} }>());
export const addUser = createAction('[User] Add User', props<{
  username: string, firstname: string,
  lastname: string, password: string, phoneNumber: string, status: string
}>());
export const addUserSuccess = createAction('[User] Add User Success', props<{ user: User }>());
export const addUserFailure = createAction('[User] Add  Users Failure', props<{ error: string }>());
export const updateUser = createAction('[User] Update User', props<{
  id: string,
  firstname: string;
  lastname: string;
  phoneNumber: string;
  status: string
}>());
export const updateUserSuccess = createAction('[User] Update User Success', props<{ user: User }>());
export const updateUserFailure = createAction('[User] Update Users Failure', props<{ error: string }>());
export const deleteUser = createAction('[User] Delete User', props<{ id: string }>());
export const deleteUserSuccess = createAction('[User] Delete User Success', props<{ mess: string }>());
export const deleteUserFailure = createAction('[User] Delete User Failure', props<{ error: string }>());
export const changeFilter = createAction('[User] Change Filter',
  props<{pageNumber:string,status:string,pageSize:string,searchQuery:string}>()
);

