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

  constructor(public users: User[]) {}
}

export class AddUser implements Action {
  public readonly  type = EnumUserActions.AddUser;
  public newUser: {
    username: string;
    password: string;
    birthday: string;
    position: string;
    areas: Array<string>;
  };

  constructor(newUser) {
    this.newUser = newUser;
  }
}

export class AddUserSuccess implements Action {
  public readonly type = EnumUserActions.AddUserSuccess;
  constructor(public users: User[], public message: string ) {}
}

export type UserActions = GetUsers | GetUsersSuccess | AddUser | AddUserSuccess;
