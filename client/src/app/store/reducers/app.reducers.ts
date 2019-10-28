import { ActionReducerMap } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';
import { userReducers } from './user.reducers';

import { AppState } from '../state/app.state';


export const appReducers: ActionReducerMap<AppState, any> = {
  router: routerReducer,
  users: userReducers
};
