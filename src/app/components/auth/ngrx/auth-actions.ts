import { createAction, props } from '@ngrx/store';
import { User } from '../../../model/User';

export const login = createAction(
  '[Auth] Login',
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction('[Auth] Login Sucess', props<{
  user: User
}>());

export const loginFailure = createAction('[Auth] Login Failure', props<{ error: string }>());
