import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Incident } from '../models/incident.interface';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {
  constructor(private http: HttpClient) { }

  getIncidents(): Observable<{ incidents: Incident[] }> {
    return this.http.get<{ incidents: Incident[] }>('/api/getIncidents');
  }

  addIncident(incident: Incident): Observable<{ incidents: Incident[] }> {
    return this.http.post<{ incidents: Incident[] }>('/api/addIncident', { incident });
  }

  editIncident(id: number, description: string, assignee: string, status: string): Observable<{incident: Incident }> {
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
