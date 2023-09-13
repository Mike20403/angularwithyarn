import { User } from '../../../model/User';
import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth-actions';


export interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  error: string | null;
  isLoading: boolean;
}

export const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
  error: null,
  isLoading: false,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.login, (state) => ({
    ...state, error: null, isLoading: true
  })),
  on(AuthActions.loginSuccess, (state, { token }) => ({
    ...state, user: { email: '', token }, isLoggedIn: true, isLoading: false
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state, isLoggedIn: false, error: error, isLoading: false
  })),
  on(AuthActions.logout, (state) => ({
    ...state, isLoggedIn: false, error: null, isLoading: false, user: null
  }))
);
