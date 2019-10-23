import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorHandler, HandleError } from './http-error-handler.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly handleError: HandleError;

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('HeroesService');
  }

  static logout() {
    localStorage.removeItem('access_token');
  }

  public login(username: string, password: string): Observable<{ error: string, token: string } | {
    error: string, token: string }> {
    return this.http.post<{ token: string,
      error: string }>('/api/auth', { username, password })
      .pipe(
        catchError(this.handleError('login', { error: 'Connection error!', token: '' }))
      );
  }

  public get loggedIn(): boolean {
    return (localStorage.getItem('access_token') !== null);
  }
}
