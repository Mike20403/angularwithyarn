import { createAction, props } from '@ngrx/store';
import { User } from '../../../model/User';

export const login = createAction(
  '[Auth] Login',
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction('[Auth] Login Sucess',
  props<{ token: string }>()
);

export const logout = createAction('[Auth] Logout');
export const autoLogin = createAction('[Auth] Auto Login');
export const loginFailure = createAction('[Auth] Login Failure', props<{ error: string }>());
