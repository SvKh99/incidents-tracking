import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Config } from '../models/config.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  // tslint:disable-next-line:variable-name
  constructor(private _http: HttpClient) { }

  getConfig(): Observable<Config> {
    return this._http.get<Config>('/api/config');
  }
}
