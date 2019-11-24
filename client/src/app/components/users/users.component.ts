import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { GetUsers, AddUser } from '../../store/actions/user.actions';
import { AppState } from '../../store/state/app.state';
import { selectUserList } from '../../store/selectors/user.selector';

import { ModalService } from '../../modal/_services';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.less']
})
export class UsersComponent implements OnInit {
  constructor(private store: Store<AppState>, private modalService: ModalService) { }

  public error: string;
  public username: string;
  public password: string;
  public birthday: Date;
  public position: string;
  public users = this.store.pipe(select(selectUserList));

  public Pressing: boolean;
  public Welding: boolean;
  public Galvanizing: boolean;
  public Primer: boolean;
  public Coloring: boolean;
  public Assembling: boolean;
  public Storage: boolean;
  public Transporting: boolean;
  public IT: boolean;

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

  openModal() {
    this.modalService.open('custom-modal-2');
  }

  public add() { // Прежде всего оформить ngrx и бэк
    const areas = [];

    if (this.Pressing) { areas.push('Pressing'); }
    if (this.Welding) { areas.push('Welding'); }
    if (this.Galvanizing) { areas.push('Galvanizing'); }
    if (this.Primer) { areas.push('Primer'); }
    if (this.Coloring) { areas.push('Coloring'); }
    if (this.Assembling) { areas.push('Assembling'); }
    if (this.Storage) { areas.push('Storage'); }
    if (this.Transporting) { areas.push('Transporting'); }
    if (this.IT) { areas.push('IT'); }

    const newUser = {
      username: this.username,
      password: this.password,
      birthday: this.birthday,
      position: this.position,
      areas
    };

    this.store.dispatch(new AddUser(newUser));
    this.username = this.password = this.birthday = this.position = this.Pressing = this.Welding =
      this.Galvanizing = this.Primer = this.Coloring = this.Assembling = this.Storage = this.Transporting = this.IT = undefined;
    this.modalService.close('custom-modal-2');
  }
}
