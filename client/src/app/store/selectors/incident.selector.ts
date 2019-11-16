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

export const selectStatusNumbers = createSelector(
  selectIncidents,
  (state: IncidentState) => {
    let opened = 0;
    let extraInfo = 0;
    let inWork = 0;
    let closed = 0;
    let resolved = 0;
    let checked = 0;
    let defect = 0;

    if (state.incidents !== undefined) {
      state.incidents.forEach(inc => {
        if (inc.status === 'Opened') {
          opened += 1;
        } else if (inc.status === 'Needed info') {
          extraInfo += 1;
        } else if (inc.status === 'In work') {
          inWork += 1;
        } else if (inc.status === 'Closed') {
          closed += 1;
        } else if (inc.status === 'Resolved') {
          resolved += 1;
        } else if (inc.status === 'Checked') {
          checked += 1;
        } else if (inc.status === 'Defect') {
          defect += 1;
        }
      });

      return { opened, extraInfo, inWork, closed, resolved, checked, defect };
    }
  }
);
