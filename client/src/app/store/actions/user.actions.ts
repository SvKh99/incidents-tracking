import { Action } from '@ngrx/store';
import { User } from '../../models/user.interface';

export enum EnumUserActions {
  GetUsers = '[User] Get Users',
  GetUsersSuccess = '[User] Get Users Success',
  AddUser = '[User] Add User',
  AddUserSuccess = '[User] Add User Success',
}

export class GetUsers implements Action {
  public readonly type = EnumUserActions.GetUsers;
}

export class GetUsersSuccess implements Action {
  public readonly type = EnumUserActions.GetUsersSuccess;
  constructor(public payload: User[]) {}
}

export class AddUser implements Action {
  public readonly  type = EnumUserActions.AddUser;
  public username: string;
  public password: string;
  public birthday: Date;
  public position: string;

  constructor(username, password, birthday, position) {
    this.username = username;
    this.password = password;
    this.birthday = birthday;
    this.position = position;
  }
}

export class AddUserSuccess implements Action {
  public readonly type = EnumUserActions.AddUserSuccess;
  constructor(public  payload: User[]) {}
}

/* export class GetUser implements Action {
  public readonly type = EnumUserActions.GetUser;
  constructor(public payload: string) {
  }
}

export class GetUserSuccess implements Action {
  public readonly type = EnumUserActions.GetUserSuccess;
  constructor(public payload: User) {
  }
} */

export type UserActions = GetUsers | GetUsersSuccess | AddUser | AddUserSuccess;
