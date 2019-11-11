import { Component, Input, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';

import { Incident } from '../../models/incident.interface';
import { AppState } from '../../store/state/app.state';
import { GetIncident } from '../../store/actions/incident.actions';
import { selectSelectedIncident } from '../../store/selectors/incident.selector';

import { IncidentService } from '../../services/incident.service';

@Component({
  selector: 'app-incident-details',
  templateUrl: './incident-details.component.html',
  styleUrls: ['./incident-details.component.less']
})
export class IncidentDetailsComponent implements OnInit {
  public incident: Incident;

  constructor(private store: Store<AppState>, private route: ActivatedRoute, private incidentService: IncidentService) { }

  ngOnInit() {
    this.store.dispatch(new GetIncident(this.route.snapshot.params.id));
    this.store.pipe(select(selectSelectedIncident)).subscribe(res => {
      this.incident = res; });
  }

  public calculateColor(priority: string) {
    if (priority === 'Minor') { return '#646464'; }
    if (priority === 'Normal') { return '#ffec40'; }
    if (priority === 'Major') { return '#ff942d'; }
    if (priority === 'Critical') { return '#ff0f00'; }
    if (priority === 'Blocker') { return '#323232'; }
  }
}
