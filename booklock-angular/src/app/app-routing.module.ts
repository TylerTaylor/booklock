import { AuthGuard } from './guards/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { UploadComponent } from './upload/upload.component';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'upload',
    component: UploadComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'bookmarks',
    component: BookmarksComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }