import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../models/user.interface';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) { }

  getUsers(): Observable<{ users: User[], message: string }> {
    return this.http.get<{ users: User[], message: string }>('/api/getUsers');
  }

  addUser(newUser: { username: string; password: string; birthday: string; position: string; }):
    Observable<{ users: User[]; message: string }> {
    return this.http.post<{ users: User[], message: string }>('/api/addUser', { newUser });
  }
}
