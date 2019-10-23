import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  constructor(private auth: AuthService, private router: Router) { }

  logout() {
    AuthService.logout();
    this.router.navigate(['login']);
  }
}
