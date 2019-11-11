import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { of } from 'rxjs';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';

import { AppState } from '../state/app.state';
import { EnumIncidentActions, GetIncidents, GetIncidentsSuccess, GetIncident, GetIncidentSuccess,
  AddIncident, AddIncidentSuccess } from '../actions/incident.actions';
import { IncidentService } from '../../services/incident.service';
import { Incident } from '../../models/incident.interface';
import { selectIncidentList } from '../selectors/incident.selector';

@Injectable()
export class IncidentEffects {
  @Effect()
  getIncidents$ = this.actions$.pipe(
    ofType<GetIncidents>(EnumIncidentActions.GetIncidents),
    switchMap(() => {
      console.log('effect');
      const a = this.incidentService.getIncidents();
      console.log('effect is here', a);
      return a;
    }),
    // @ts-ignore
    switchMap((value: { incidents: Incident[] }) => of(new GetIncidentsSuccess(value)))
  );

  @Effect()
  getIncident$ = this.actions$.pipe(
    ofType<GetIncident>(EnumIncidentActions.GetIncident),
    map(action => action.id),
    withLatestFrom(this.store.pipe(select(selectIncidentList))),
    switchMap(([id, incidents]) => {
      console.log('incidents', incidents);
      const selectedIncident = incidents.filter(incident => incident.id === +id)[0];
      console.log(selectedIncident);
      const q = of(new GetIncidentSuccess(selectedIncident));
      console.log('q', q);
      return q;
    })
  );

  @Effect()
  addIncident$ = this.actions$.pipe(
    ofType<AddIncident>(EnumIncidentActions.AddIncident),
    switchMap((action) => {
      return this.incidentService.addIncident(action.incident);
    }),
    switchMap((value: { incidents: Incident[] }) => {
      // @ts-ignore
      const a = of(new AddIncidentSuccess(value));
      console.log(a);
      console.log(value);
      console.log(value.incidents);
      return a;
    })
  );

  constructor(
    private incidentService: IncidentService,
    private actions$: Actions,
    private store: Store<AppState>
  ) {}
}
