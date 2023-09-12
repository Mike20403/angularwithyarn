import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';

import { environment } from '@app/env';

export interface State {
  router: RouterReducerState<any>;
}

export const reducers: ActionReducerMap<State> = {
  router: routerReducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
