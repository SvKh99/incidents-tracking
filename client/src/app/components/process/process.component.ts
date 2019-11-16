import { Component, OnInit, Output } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { AppState } from '../../store/state/app.state';
import { selectStatusNumbers } from '../../store/selectors/incident.selector';
import { GetIncidents } from '../../store/actions/incident.actions';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.less']
})
export class ProcessComponent implements OnInit {
  constructor(private store: Store<AppState>) { }

  public statusNumbers: { opened: number, inWork: number, extraInfo: number, closed: number,
    resolved: number, checked: number, defect: number };

  ngOnInit() {
    this.store.dispatch(new GetIncidents());
    this.store.pipe(select(selectStatusNumbers)).subscribe(res => {
      this.statusNumbers = res;
    });
  }
}
