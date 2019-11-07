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
  @Effect()
  getUsers$ = this.actions$.pipe(
    ofType<GetUsers>(EnumUserActions.GetUsers),
    switchMap(() => this.userService.getUsers()),
    // @ts-ignore
    switchMap((value: { users: User[] }) => of(new GetUsersSuccess(value)))
  );

  @Effect()
  addUser$ = this.actions$.pipe(
    ofType<AddUser>(EnumUserActions.AddUser),
    switchMap((action) => {
      return this.userService.addUser(action.username, action.password, action.birthday, action.position);
    }),
    switchMap((value: { users: User[], message: string }) => of(new AddUserSuccess(value.users, value.message)))
  );

  constructor(
    private userService: UserService,
    private actions$: Actions,
    private store: Store<AppState>
  ) {}
}
