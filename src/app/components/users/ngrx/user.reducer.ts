// user.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { userAdapter, initialUserState } from './user.state';
import * as userActions from './user.actions';
import { state } from '@angular/animations';

export const userReducer = createReducer(
  initialUserState,
  on(userActions.changeFilter, (state, { searchQuery, status }) => ({
    ...state,
    filter: { searchQuery: searchQuery, status: status }
  })),
  on(userActions.loadUserByIDSuccess, (state) => ({ ...state })),
  on(userActions.addUser, (state) => ({ ...state, error: '' })),
  on(userActions.updateUser, (state) => ({ ...state, isEdited: true })),
  on(userActions.loadUsersSuccess, (state, { users }) => userAdapter.setAll(users, state)),
  on(userActions.addUserSuccess, (state, { user }) => (userAdapter.setOne(user, state), { ...state, error: '' })),
  on(userActions.updateUserSuccess, (state, { user }) => (userAdapter.updateOne({
    id: user.id,
    changes: user
  }, state), { ...state, isEdited: false })),
  on(userActions.deleteUserSuccess, (state, { mess }) => (userAdapter.removeOne(mess, state), {
    ...state,
    isEdited: false
  })),
  on(userActions.addUserFailure, (state, { error }) => ({ ...state, error: error })));


export function reducer(state: any, action: any) {
  return userReducer(state, action);
}
