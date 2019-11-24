import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Router } from '@angular/router';

import { AppState } from '../../store/state/app.state';
import { GetUsers} from '../../store/actions/user.actions';
import { selectUserList } from '../../store/selectors/user.selector';
import { selectIncidentList } from '../../store/selectors/incident.selector';
import { AddIncident, GetIncidents } from '../../store/actions/incident.actions';

import { IncidentService } from '../../services/incident.service';
import { ModalService } from '../../modal/_services';
import { User } from '../../models/user.interface';

@Component({
  selector: 'app-incidents',
  templateUrl: './incidents.component.html',
  styleUrls: ['./incidents.component.less']
})
export class IncidentsComponent implements OnInit {
  constructor(private store: Store<AppState>, private router: Router,
              private incidentService: IncidentService, private modalService: ModalService) { }
  @Output()
  incidentSelected: EventEmitter<number> = new EventEmitter();

  public users = this.store.pipe(select(selectUserList));
  public areas =  [
    'Pressing', 'Welding', 'Galvanizing', 'Primer', 'Coloring', 'Assembling', 'Storage', 'Transporting', 'IT'
  ];
  public priority = [
    'Blocker', 'Critical', 'Major', 'Normal', 'Minor'
  ];

  public incidentName: string;
  public dateNow: Date;
  public dueDate: Date;
  public selectedArea: string = undefined;
  public selectedWorker: User = undefined;
  public selectedPriority: string = undefined;
  public description: string;

  public incidents = this.store.pipe(select(selectIncidentList));

  ngOnInit() {
    this.store.dispatch(new GetUsers());
    this.store.dispatch(new GetIncidents());
    this.dateNow = new Date();
  }

  navigateToIncident(id: number) {
    this.router.navigate(['incident', id]);
  }

  checkDueDate() {
    this.dateNow = new Date();
    return this.dateNow.getTime() > new Date(this.dueDate).getTime();
  }

  checkAssignee() {
    if (this.selectedWorker === undefined || this.selectedArea === undefined) {
      return true;
    } else {
      return this.selectedWorker.areas.indexOf(this.selectedArea) !== -1;
    }
  }

  openModal() {
    this.modalService.open('custom-modal-1');
  }

  addIncident() {
    let worker;

    if (this.selectedWorker !== undefined) {
      worker = this.selectedWorker.username;
    }
    const incident = {
      id: undefined,
      name: this.incidentName,
      assignee: worker,
      area: this.selectedArea,
      startDate: this.dateNow,
      dueDate: new Date(this.dueDate),
      description: this.description,
      priority: this.selectedPriority,
      status: 'Opened'
    };

    this.store.dispatch(new AddIncident(incident));
    this.incidentName = this.selectedWorker = this.selectedArea =
      this.dateNow = this.dueDate = this.description = this.selectedPriority = undefined;
    this.modalService.close('custom-modal-1');
  }
}
