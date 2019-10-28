import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Users } from '../models/users.interface';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) { }

  getUsers(): Observable<Users> {
    return this.http.get<Users>('/api/getUsers');
  }

  addUser(username: string, password: string, birthday: Date, position: string): Observable<Users> {
    return this.http.post<Users>('/api/addUser', { username,
      password, birthday, position });
  }
}
