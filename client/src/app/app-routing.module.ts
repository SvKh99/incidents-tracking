import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';

import { LoginComponent } from './login/login.component';
import { IncidentsComponent } from './incidents/incidents.component';
import { ProcessComponent } from './process/process.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: 'incidents', component: IncidentsComponent, canActivate: [AuthGuard] },
  { path: 'process', component: ProcessComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }