import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  static logout() {
    localStorage.clear();
  }

  public login(username: string, password: string): Observable<{ token: string, username: string, error: string }> {
    return this.http.post<{ token: string, username: string, error: string
    }>('/api/auth', { username, password });
  }

  public getNewToken() {
    const activationTime = new Date();
    const username = localStorage.getItem('username');

    this.http.post<{ token: string, username: string, error: string
    }>('/api/refreshToken', { username })
      .pipe(first())
      .subscribe(
        result => {
          localStorage.setItem('access_token', result.token);
          localStorage.setItem('activation_time', String(activationTime));
        },
        err => {
          console.log(err);
        }
      );
  }

  public checkTokenExpiration() {
    const activationTime = new Date(localStorage.getItem('activation_time'));

    return (activationTime.getTime() +  2 * 60 * 60 * 1000 <= new Date().getTime());
  }

  public get loggedIn(): boolean {
    return (localStorage.getItem('access_token') !== null);
  }
}
