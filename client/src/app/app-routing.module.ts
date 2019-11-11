import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './services/auth.guard';
import { LoginGuard } from './services/login.guard';

import { LoginComponent } from './components/login/login.component';
import { IncidentsComponent } from './components/incidents/incidents.component';
import { IncidentDetailsComponent } from './components/incident-details/incident-details.component';
import { ProcessComponent } from './components/process/process.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  { path: 'incidents', component: IncidentsComponent, canActivate: [AuthGuard] },
  { path: 'incident/:id', component: IncidentDetailsComponent, canActivate: [AuthGuard] },
  { path: 'process', component: ProcessComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: '**', redirectTo: 'incidents' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
