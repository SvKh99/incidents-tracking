import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Incident } from '../models/incident.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {
  constructor(private http: HttpClient, private auth: AuthService) { }

  getIncidents(): Observable<{ incidents: Incident[] }> {
    if (this.auth.checkTokenExpiration()) {
      this.auth.getNewToken();
    }
    return this.http.get<{ incidents: Incident[] }>('/api/getIncidents');
  }

  addIncident(incident: Incident): Observable<{ incidents: Incident[] }> {
    if (this.auth.checkTokenExpiration()) {
      this.auth.getNewToken();
    }
    return this.http.post<{ incidents: Incident[] }>('/api/addIncident', { incident });
  }

  editIncident(id: number, description: string, assignee: string, status: string): Observable<{incident: Incident }> {
    if (this.auth.checkTokenExpiration()) {
      this.auth.getNewToken();
    }
    return this.http.patch<{ incident: Incident }>('/api/editIncident', { id, description, assignee, status });
  }

  formatDate(date) {
    date = new Date(date);
    let dd = date.getDate();
    if (dd < 10) { dd = '0' + dd; }

    let mm = date.getMonth() + 1;
    if (mm < 10) { mm = '0' + mm; }

    const yy = date.getYear();

    return dd + '.' + mm + '.' + yy;
  }
}
