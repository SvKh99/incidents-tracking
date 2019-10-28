import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';

import { AppState } from './store/state/app.state';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router, private store: Store<AppState>) { }

  ngOnInit() {
  }

  logout() {
    AuthService.logout();
    this.router.navigate(['login']);
  }
}
