import { Action } from '@ngrx/store';
import { Incident } from '../../models/incident.interface';

export enum EnumIncidentActions {
  GetIncident = '[Incident] Get Incident',
  GetIncidentSuccess = '[Incident] Get Incident Success',
  GetIncidents = '[Incident] Get Incidents',
  GetIncidentsSuccess = '[Incident] Get Incidents Success',
  AddIncident = '[Incident] Add Incident',
  AddIncidentSuccess = '[Incident] Add Incident Success',
  EditIncident = '[Incident] Edit Incident',
  EditIncidentSuccess = '[Incident] Edit Incident Success'
}

export class GetIncident implements Action {
  public readonly type = EnumIncidentActions.GetIncident;

  constructor(public id: number) {
  }
}

export class GetIncidentSuccess implements Action {
  public readonly type = EnumIncidentActions.GetIncidentSuccess;

  constructor(public selectedIncident: Incident) {
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

export class EditIncident implements Action {
  public readonly type = EnumIncidentActions.EditIncident;
  public id: number;
  public description: string;
  public assignee: string;
  public status: string;

  constructor(id, description, assignee, status) {
    this.id = id;
    this.description = description;
    this.assignee = assignee;
    this.status = status;
  }
}

export class EditIncidentSuccess implements Action {
  public readonly type = EnumIncidentActions.EditIncidentSuccess;

  constructor(public selectedIncident: Incident) {}
}


export type IncidentActions = GetIncident | GetIncidentSuccess | GetIncidents | GetIncidentsSuccess | AddIncident
  | AddIncidentSuccess | EditIncident | EditIncidentSuccess;
