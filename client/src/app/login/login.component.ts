import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent {
  public username: string;
  public password: string;
  public error: string;

  constructor(private auth: AuthService, private router: Router) { }

  public submit() {
    localStorage.setItem('error', '');
    this.auth.login(this.username, this.password)
      .pipe(first())
      .subscribe(
         result => {
           if (result.error) {
             this.error = result.error;
           } else if (result.token) {
             localStorage.setItem('access_token', result.token);
             this.router.navigate(['users']);
           }},
          err => {
           this.error = 'Connection error!';
           console.log(err);
         }
      );
  }
}

