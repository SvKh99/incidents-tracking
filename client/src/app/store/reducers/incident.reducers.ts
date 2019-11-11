import {IncidentState, initialIncidentState} from '../state/incident.state';
import { EnumIncidentActions, IncidentActions } from '../actions/incident.actions';

export const incidentReducers = (
  state = initialIncidentState,
  action: IncidentActions
): IncidentState => {
  switch (action.type) {
    case EnumIncidentActions.GetIncidentsSuccess: {
      return {
        ...state,
        incidents: action.incidents,
      };
    }
    case EnumIncidentActions.GetIncidentSuccess: {
      console.log('r', action);
      return {
        ...state,
        selectedIncident: action.selectedIncident,
      };
    }
    case EnumIncidentActions.AddIncidentSuccess: {
      return {
        ...state,
        incidents: action.incidents,
      };
    }
    default:
      return state;
  }
};
