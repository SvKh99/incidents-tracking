import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.less']
})
export class UsersComponent implements OnInit {
  constructor() { }

  public error: string;
  public username: string;
  public password: string;
  public birthday: Date;
  public position: string;

  ngOnInit() {
  }

  public addUser() {
    alert('В разработке!');
  }
}
