import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterializeModule } from 'angular2-materialize';
import { Angular2TokenService } from 'angular2-token';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthDialogComponent } from './auth-dialog/auth-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    AuthDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterializeModule,
    HttpModule
  ],
  providers: [ Angular2TokenService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
