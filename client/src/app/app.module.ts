import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { appReducers } from './store/reducers/app.reducers';
import { UserEffects } from './store/effects/user.effects';
import { IncidentEffects } from './store/effects/incident.effects';

import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth.guard';
import { UserService } from './services/user.service';
import { IncidentService } from './services/incident.service';

import { LoginComponent } from './components/login/login.component';
import { UsersComponent } from './components/users/users.component';
import { ProcessComponent } from './components/process/process.component';
import { IncidentsComponent } from './components/incidents/incidents.component';
import { IncidentDetailsComponent } from './components/incident-details/incident-details.component';

import { ModalComponent } from './modal/_components';

export function getToken() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UsersComponent,
    ProcessComponent,
    IncidentsComponent,
    IncidentDetailsComponent,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([UserEffects, IncidentEffects]),
    StoreRouterConnectingModule.forRoot({ stateKey: 'root' }),
    JwtModule.forRoot({
      config: {
        tokenGetter: getToken,
        whitelistedDomains: ['localhost:4000'],
        blacklistedRoutes: ['localhost:4000/api/auth', 'localhost:4000/api/refreshToken']
      }
    }),
  ],
  providers: [
    AuthService,
    AuthGuard,
    UserService,
    IncidentService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
