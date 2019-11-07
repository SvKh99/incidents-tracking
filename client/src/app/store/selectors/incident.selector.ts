import { createSelector } from '@ngrx/store';

import { AppState } from '../state/app.state';
import { IncidentState } from '../state/incident.state';

const selectIncidents = (state: AppState) => {
  console.log('in selector', state);
  return state.incidentsState;
};

export const selectIncidentList = createSelector(
  selectIncidents,
  (state: IncidentState) => {
    console.log('in selector 2', state);
    return state.incidents;
  }
);
