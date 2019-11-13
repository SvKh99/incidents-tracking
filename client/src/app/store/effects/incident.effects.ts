import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';

import { AppState } from '../state/app.state';
import {
  AddIncident,
  AddIncidentSuccess,
  EditIncident,
  EditIncidentSuccess,
  EnumIncidentActions,
  GetIncident,
  GetIncidents,
  GetIncidentsSuccess,
  GetIncidentSuccess
} from '../actions/incident.actions';
import { IncidentService } from '../../services/incident.service';
import { Incident } from '../../models/incident.interface';
import { selectIncidentList } from '../selectors/incident.selector';

@Injectable()
export class IncidentEffects {
  @Effect()
  getIncidents$ = this.actions$.pipe(
    ofType<GetIncidents>(EnumIncidentActions.GetIncidents),
    switchMap(() => {
      return this.incidentService.getIncidents();
    }),
    switchMap((value: { incidents: Incident[] }) => of(new GetIncidentsSuccess(value.incidents)))
  );

  @Effect()
  getIncident$ = this.actions$.pipe(
    ofType<GetIncident>(EnumIncidentActions.GetIncident),
    map(action => action.id),
    withLatestFrom(this.store.pipe(select(selectIncidentList))),
    switchMap(([id, incidents]) => {
      const selectedIncident = incidents.filter(incident => incident.id === +id)[0];
      return of(new GetIncidentSuccess(selectedIncident));
    })
  );

  @Effect()
  addIncident$ = this.actions$.pipe(
    ofType<AddIncident>(EnumIncidentActions.AddIncident),
    switchMap((action) => {
      return this.incidentService.addIncident(action.incident);
    }),
    switchMap((value: { incidents: Incident[] }) => {
      return of(new AddIncidentSuccess(value.incidents));
    })
  );

  @Effect()
  editIncident$ = this.actions$.pipe(
    ofType<EditIncident>(EnumIncidentActions.EditIncident),
    switchMap((action) => {
      return this.incidentService.editIncident(action.id, action.description, action.assignee, action.status);
    }),
    switchMap((value: { incident: Incident }) => {
      return of(new EditIncidentSuccess(value.incident));
    })
  );

  constructor(
    private incidentService: IncidentService,
    private actions$: Actions,
    private store: Store<AppState>
  ) {}
}
