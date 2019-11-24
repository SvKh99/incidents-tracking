import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
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

    const activationTime = new Date();

    this.auth.login(this.username, this.password)
      .pipe(first())
      .subscribe(
         result => {
           console.log(result);
           if (result.error) {
             this.error = result.error;
           } else if (result.token) {
             localStorage.setItem('access_token', result.token);
             localStorage.setItem('activation_time', String(activationTime));
             localStorage.setItem('username', result.username);
             this.router.navigate(['incidents']);
           }},
          err => {
           this.error = 'Connection error!';
         }
      );
  }
}

