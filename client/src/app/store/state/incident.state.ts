import { Incident } from '../../models/incident.interface';

export interface IncidentState {
  incidents: Incident[];
  selectedIncident: Incident;
}

export const initialIncidentState: IncidentState = {
  incidents: undefined,
  selectedIncident: undefined
};
