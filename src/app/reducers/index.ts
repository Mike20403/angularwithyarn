import {
  ActionReducerMap, createAction, createFeatureSelector, createSelector,
  MetaReducer
} from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { environment } from '@app/env';
import { AuthState } from '../components/auth/ngrx/auth-reducer';
import * as fromAuth from '../components/auth/ngrx/auth-reducer';

import { userReducer } from '../components/users/ngrx/user.reducer';
import { userAdapter, UserState } from '../components/users/ngrx/user.state';


// Create a feature selector to select the UserState from the store
export const selectUserState = createFeatureSelector<UserState>('users');
// Use userAdapter to generate selectors for entities
export const {
  selectAll,
  selectEntities,

} = userAdapter.getSelectors(selectUserState);
export const selectUserEntities = selectEntities;
export const selectAllUsers = selectAll;
export const selectUserError = createSelector(selectUserState,
  (state) => state.error);
// Create a selector to get a user by their ID




export interface State {
  router: RouterReducerState<any>;
  authState: AuthState;
  users: UserState;
}


export const selectState = (state: State) => state;
export const selectCurrentUser = createSelector(selectState,
  (state) => state.users.currentUser)
export const selectUserloading = createSelector(
  selectState,
  (state) => state.users.loading
);
export const selectPaginator = createSelector(
  selectState,
    (state) => state.users.paginator
)
export const selectisEdited = createSelector(selectState, (state) =>
  state.users.isEdited);
export const selectAuthState = (state: State) => state.authState;
export const selectAuthToken = createSelector(selectState,
  (state) => state.authState.user?.token
)
export const selectIsLoading = createSelector(
  selectState,
  (state) => state.authState.isLoading
);
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
  authState: fromAuth.authReducer,
  users: userReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];


