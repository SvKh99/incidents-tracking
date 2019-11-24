import { Component, Input, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';

import { Incident } from '../../models/incident.interface';
import { AppState } from '../../store/state/app.state';
import { EditIncident, GetIncident, GetIncidents } from '../../store/actions/incident.actions';
import { selectSelectedIncident } from '../../store/selectors/incident.selector';
import { selectUserList } from '../../store/selectors/user.selector';
import { GetUsers } from '../../store/actions/user.actions';

import { IncidentService } from '../../services/incident.service';
import { User } from '../../models/user.interface';

@Component({
  selector: 'app-incident-details',
  templateUrl: './incident-details.component.html',
  styleUrls: ['./incident-details.component.less']
})
export class IncidentDetailsComponent implements OnInit {
  public incident: Incident;
  public description: string = undefined;
  public selectedWorker: User = undefined;
  public selectedStatus: string = undefined;

  public status = {
    Opened: ['Needed info', 'In work'],
    Neededinfo: ['In work'],
    Inwork: ['Needed info', 'Resolved'],
    Resolved: ['Checked', 'Closed'],
    Closed: ['Checked', 'Defect'],
    Checked: [],
    Defect: ['Needed info', 'In work']
  };

  public users = this.store.pipe(select(selectUserList));

  constructor(private store: Store<AppState>, private route: ActivatedRoute, private incidentService: IncidentService) { }

  ngOnInit() {
    this.store.dispatch(new GetIncidents());
    this.store.dispatch(new GetIncident(this.route.snapshot.params.id));
    this.store.pipe(select(selectSelectedIncident)).subscribe(res => {
      this.incident = res;
      this.description = res.description;
      this.selectedStatus = res.status;
      this.selectedWorker = {
        username: res.assignee,
        birthday: undefined,
        position: undefined,
        areas: undefined
      };
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

  checkAssignee() {
    if (this.selectedWorker.areas === undefined || this.incident === undefined) {
      return true;
    } else {
      return this.selectedWorker.areas.indexOf(this.incident.area) !== -1;
    }
  }

  editIncident() {
    if (this.description === this.incident.description && this.selectedStatus === this.incident.status
      && this.selectedWorker.username === this.incident.assignee) {
      return;
    } else {
      this.store.dispatch(new EditIncident(Number(this.route.snapshot.params.id), this.description,
        this.selectedWorker.username, this.selectedStatus));
    }
  }
}
