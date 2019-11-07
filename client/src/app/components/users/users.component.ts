import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { GetUsers, AddUser } from '../../store/actions/user.actions';
import { AppState } from '../../store/state/app.state';
import { selectUserList } from '../../store/selectors/user.selector';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.less']
})
export class UsersComponent implements OnInit {
  constructor(private store: Store<AppState>) { }

  public error: string;
  public username: string;
  public password: string;
  public birthday: Date;
  public position: string;
  public users = this.store.pipe(select(selectUserList));

  ngOnInit() {
    this.store.dispatch(new GetUsers());
  }

  public checkName() {
    if (this.username) {
      return !/\d/.test(this.username);
    }
    return true;
  }

  public checkPassword() {
    if (this.password) {
      return this.password.length >= 4;
    }
    return true;
  }

  public add() {
    this.store.dispatch(new AddUser(this.username, this.password, this.birthday, this.position));
    this.username = this.password = this.birthday = this.position = undefined;
    setTimeout(() => {
      console.log(this.users);
    }, 5000);
  }
}
