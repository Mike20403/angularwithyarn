// user.state.ts
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { User } from '../../../model/User';


export interface UserState extends EntityState<User> {
  // Define additional state properties here if needed
  selectedId: string
  loading: boolean,
  error: string,
  filter: {
    searchQuery: string,
    status: string
  },
  isEdited: boolean,
}

export const userAdapter: EntityAdapter<User> = createEntityAdapter<User>();

export const initialUserState: UserState = userAdapter.getInitialState({
  // Define initial state properties here if needed
  selectedId: '',
  isEdited: false,
  loading: false,
  error: '',
  filter: {
    searchQuery: '',
    status: ''
  }
});
