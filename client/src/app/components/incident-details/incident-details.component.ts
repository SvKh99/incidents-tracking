import { Component, Input, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';

import { Incident } from '../../models/incident.interface';
import { AppState } from '../../store/state/app.state';
import { EditIncident, GetIncident} from '../../store/actions/incident.actions';
import { selectSelectedIncident } from '../../store/selectors/incident.selector';
import { selectUserList } from '../../store/selectors/user.selector';
import { GetUsers } from '../../store/actions/user.actions';

import { IncidentService } from '../../services/incident.service';

@Component({
  selector: 'app-incident-details',
  templateUrl: './incident-details.component.html',
  styleUrls: ['./incident-details.component.less']
})
export class IncidentDetailsComponent implements OnInit {
  public incident: Incident;
  public description: string;
  public selectedWorker: string;
  public selectedStatus: string;

  public status = [
    'Opened', 'Needed info', 'In work', 'Resolved', 'Checked', 'Closed', 'Defect'
  ];
  public users = this.store.pipe(select(selectUserList));

  constructor(private store: Store<AppState>, private route: ActivatedRoute, private incidentService: IncidentService) { }

  ngOnInit() {
    this.store.dispatch(new GetIncident(this.route.snapshot.params.id));
    this.store.pipe(select(selectSelectedIncident)).subscribe(res => {
      this.incident = res;
      this.description = res.description;
      this.selectedWorker = res.assignee;
      this.selectedStatus = res.status;
    });
    this.store.dispatch(new GetUsers());
  }

  public calculateColor(priority: string) {
    if (priority === 'Minor') { return '#646464'; }
    if (priority === 'Normal') { return '#ffec40'; }
    if (priority === 'Major') { return '#ff942d'; }
    if (priority === 'Critical') { return '#ff0f00'; }
    if (priority === 'Blocker') { return '#323232'; }
  }

  editIncident() {
    if (this.description === this.incident.description && this.selectedStatus === this.incident.status
      && this.selectedWorker === this.incident.assignee) {
      return;
    } else {
      this.store.dispatch(new EditIncident(Number(this.route.snapshot.params.id), this.description,
        this.selectedWorker, this.selectedStatus));
    }
  }
}
