export enum Area {
  PRESSING = 'Pressing',
  WELDING = 'Welding',
  GALVANIZING = 'Galvanizing',
  PRIMER = 'Primer',
  COLORING = 'Coloring',
  ASSEMBLING = 'Assembling',
  STORAGE = 'Storage',
  TRANSPORTING = 'Transporting'
}


export interface Incident {
  id: number;
  name: string;
  assignee: string;
  area: string;
  startDate: Date;
  dueDate: Date;
  description: string;
  priority: string;
  status: string;
}
