import { Action } from '@ngrx/store';
import { Incident} from '../../models/incident.interface';

export enum EnumIncidentActions {
  GetIncident = '[Incident] Get Incident',
  GetIncidentSuccess = '[Incident] Get Incident Success',
  GetIncidents = '[Incident] Get Incidents',
  GetIncidentsSuccess = '[Incident] Get Incidents Success',
  AddIncident = '[Incident] Add Incident',
  AddIncidentSuccess = '[Incident] Add incident Success'
}

export class GetIncident implements Action {
  public readonly type = EnumIncidentActions.GetIncident;

  constructor(public id: number) {
    console.log('id', this.id);
  }
}

export class GetIncidentSuccess implements Action {
  public readonly type = EnumIncidentActions.GetIncidentSuccess;

  constructor(public selectedIncident: Incident) {
    console.log('action', this.selectedIncident);
  }
}

export class GetIncidents implements Action {
  public readonly type = EnumIncidentActions.GetIncidents;
}

export class GetIncidentsSuccess implements Action {
  public readonly type = EnumIncidentActions.GetIncidentsSuccess;

  constructor(public incidents: Incident[]) {}
}

export class AddIncident implements Action {
  public readonly type = EnumIncidentActions.AddIncident;
  public incident: Incident;

  constructor(incident) {
    this.incident = incident;
  }
}

export class AddIncidentSuccess implements Action {
  public readonly type = EnumIncidentActions.AddIncidentSuccess;

  constructor(public incidents: Incident[]) {}
}


export type IncidentActions = GetIncident | GetIncidentSuccess | GetIncidents | GetIncidentsSuccess | AddIncident
  | AddIncidentSuccess;
