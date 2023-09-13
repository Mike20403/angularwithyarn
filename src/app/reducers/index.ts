import {
  ActionReducerMap, createSelector,
  MetaReducer
} from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';

import { environment } from '@app/env';
import { AuthState } from '../components/auth/ngrx/auth-reducer';
import * as fromAuth from '../components/auth/ngrx/auth-reducer';

export interface State {
  router: RouterReducerState<any>;
  authState: AuthState;
}

export const selectAuthState = (state: State) => state.authState;
export const selectLoggedInUser = createSelector(
  selectAuthState,
  (authState: AuthState) => authState.user
);
export const selectAuthError = createSelector(
  selectAuthState,
  (authState: AuthState) => authState.error
);

export const reducers: ActionReducerMap<State> = {
  router: routerReducer,
  authState: fromAuth.authReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
