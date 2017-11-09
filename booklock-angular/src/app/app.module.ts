import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterializeModule } from 'angular2-materialize';
import { Angular2TokenService } from 'angular2-token';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthDialogComponent } from './auth-dialog/auth-dialog.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { UploadComponent } from './upload/upload.component';
import { LoggedInGuard } from './guards/logged-in.guard';
import { LoginComponent } from './login/login.component';
import { FileUploadModule } from 'ng2-file-upload';
import { LoaderComponent } from './loader/loader.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterPipe } from './filter.pipe';
import { EditBookmarkComponent } from './edit-bookmark/edit-bookmark.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    AuthDialogComponent,
    LoginFormComponent,
    RegisterFormComponent,
    ProfileComponent,
    BookmarksComponent,
    UploadComponent,
    LoginComponent,
    LoaderComponent,
    FilterPipe,
    EditBookmarkComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterializeModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    RouterModule,
    NgxPaginationModule
  ],
  providers: [ Angular2TokenService, AuthService, AuthGuard, LoggedInGuard, FilterPipe ],
  bootstrap: [AppComponent]
})
export class AppModule { }
