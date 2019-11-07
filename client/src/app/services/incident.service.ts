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
    this.http.get<{ incidents: Incident[] }>('/api/getIncidents').subscribe((res) =>
    console.log(res));
    return this.http.get<{ incidents: Incident[] }>('/api/getIncidents');
  }

  addIncident(incident: Incident): Observable<{ incidents: Incident[] }> {
    return this.http.post<{ incidents: Incident[] }>('/api/addIncident', { incident });
  }
}
