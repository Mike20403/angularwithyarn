import { User } from '../../../model/User';
import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth-actions';


export interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  error: string | null;
}

export const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
  error: null
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.login, (state) => ({
    ...state, error: null
  })),
  on(AuthActions.loginSuccess, (state, { user }) => ({
    ...state, user: user, isLoggedIn: true
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state, isLoggedIn: false, error: error
  })),
);
