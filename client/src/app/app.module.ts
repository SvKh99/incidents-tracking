import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { HttpErrorHandler } from './services/http-error-handler.service';
import { MessageService } from './services/message.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth.guard';

import { LoginComponent } from './components/login/login.component';
import { UsersComponent } from './components/users/users.component';
import { ProcessComponent } from './components/process/process.component';
import { IncidentsComponent } from './components/incidents/incidents.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UsersComponent,
    ProcessComponent,
    IncidentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    HttpErrorHandler,
    MessageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
