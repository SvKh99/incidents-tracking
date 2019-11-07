import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {select, Store} from '@ngrx/store';
import { AppState } from '../../store/state/app.state';
import { GetUsers } from '../../store/actions/user.actions';
import { selectUserList } from '../../store/selectors/user.selector';
import { selectIncidentList } from '../../store/selectors/incident.selector';
import { GetIncidents } from '../../store/actions/incident.actions';

@Component({
  selector: 'app-incidents',
  templateUrl: './incidents.component.html',
  styleUrls: ['./incidents.component.less']
})
export class IncidentsComponent implements OnInit {
  @Output()
  incidentSelected: EventEmitter<string> = new EventEmitter();

  constructor(private store: Store<AppState>) { }

  // public users = this.store.pipe(select(selectUserList));
  public areas =  [
    'Pressing', 'Welding', 'Galvanizing', 'Primer', 'Coloring', 'Assembling', 'Storage', 'Transporting'
  ];
  public priority = [
    'Blocker', 'Critical', 'Major', 'Normal', 'Minor'
  ];
  public status = [
    'Opened', 'Needed extra info', 'In work', 'Resolved', 'Checked', 'Closed', 'Defect', 'Reopened'
  ];

  public incidents = this.store.pipe(select(selectIncidentList));

  ngOnInit() {
    // this.store.dispatch(new GetUsers());
    this.store.dispatch(new GetIncidents());
  }

}
