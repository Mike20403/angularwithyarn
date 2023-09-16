// user.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { userAdapter, initialUserState } from './user.state';
import * as userActions from './user.actions';
import { state } from '@angular/animations';

export const userReducer = createReducer(
  initialUserState,
  on(userActions.changeFilter, (state, { searchQuery, status }) => ({
    ...state,
    filter: { searchQuery: searchQuery, status: status },
    loading:true,
  })),
  on(userActions.loadUserByIDSuccess, (state,{user}) => ({ ...state,loading:false,currentUser:user})),
  on(userActions.addUser, (state) => ({ ...state, error: '' })),
  on(userActions.updateUser, (state) => ({ ...state, isEdited: true })),
  on(userActions.loadUsersSuccess,
    (state, { users, paginator }) =>{
const updatedState = userAdapter.setAll(users, state); // Update users using userAdapter.setAll
return {
  ...updatedState, // Include the updated users state
  paginator, // Set the paginator field
  loading: false // Set the loading field to false
};}),
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
