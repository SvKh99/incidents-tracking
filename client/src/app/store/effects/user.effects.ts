import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { of } from 'rxjs';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';

import { AppState } from '../state/app.state';
import { EnumUserActions, GetUsersSuccess, GetUsers, AddUser, AddUserSuccess } from '../actions/user.actions';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.interface';

@Injectable()
export class UserEffects {
  /* @Effect()
  getUser$ = this._actions$.pipe(
    ofType<GetUser>(EnumUserActions.GetUser),
    map(action => action.payload),
    withLatestFrom(this._store.pipe(select(selectUserList))),
    switchMap(([username, users]) => {
      const selectedUser = users.filter(user => user.username === username)[0];
      return of(new GetUserSuccess(selectedUser));
    })
  ); */

  @Effect()
  getUsers$ = this.actions$.pipe(
    ofType<GetUsers>(EnumUserActions.GetUsers),
    switchMap(() => this.userService.getUsers()),
    // @ts-ignore
    switchMap((users: User[]) => of(new GetUsersSuccess(users)))
  );

  @Effect()
  addUser$ = this.actions$.pipe(
    ofType<AddUser>(EnumUserActions.AddUser),
    switchMap((action) => {
      console.log(action);
      return this.userService.addUser(action.username, action.password, action.birthday, action.position);
    }),
    // @ts-ignore
    switchMap((users: User[]) => of(new AddUserSuccess(users)))
  );

  constructor(
    private userService: UserService,
    private actions$: Actions,
    private store: Store<AppState>
  ) {}
}
