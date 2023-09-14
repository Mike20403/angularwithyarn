// user.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { userAdapter, initialUserState } from './user.state';
import * as userActions from './user.actions';
import { state } from '@angular/animations';

export const userReducer = createReducer(
  initialUserState,
  on(userActions.changeFilter, (state, { searchQuery, status }) => ({ ...state, filter: { searchQuery: searchQuery, status: status } })),
  on(userActions.loadUsersSuccess, (state, { users }) => userAdapter.setAll(users, state)),
  on(userActions.addUserSuccess, (state, { user }) => userAdapter.addOne(user, state)),
  on(userActions.updateUserSuccess, (state, { user }) => userAdapter.updateOne({ id: user.id, changes: user }, state)),
  on(userActions.deleteUserSuccess, (state, { id }) => userAdapter.removeOne(id, state))
);

export function reducer(state: any, action: any) {
  return userReducer(state, action);
}
