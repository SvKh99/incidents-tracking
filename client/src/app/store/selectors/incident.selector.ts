import { createSelector } from '@ngrx/store';

import { AppState } from '../state/app.state';
import { IncidentState } from '../state/incident.state';

const selectIncidents = (state: AppState) => {
  return state.incidentsState;
};

export const selectIncidentList = createSelector(
  selectIncidents,
  (state: IncidentState) => {
    return state.incidents;
  }
);

export const selectSelectedIncident = createSelector(
  selectIncidents,
  (state: IncidentState) => {
    return state.selectedIncident;
  }
);
