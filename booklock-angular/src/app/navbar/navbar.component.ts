import { AuthService } from './../services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthDialogComponent } from '../auth-dialog/auth-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  // authDialog ViewChild decorator references the AuthDialogComponent
  // from our template so we can access its methods and attributes
  // directly from our NavbarComponent class
  @ViewChild('authDialog') authDialog: AuthDialogComponent;

  constructor(public authService:AuthService, private router:Router) { }

  ngOnInit() {
  }

  logOut(){
    this.authService.logOutUser().subscribe(() => this.router.navigate(['/']));
  }

  // Shows the auth-dialog component with the appropriate form
  presentAuthDialog(mode?: 'login' | 'register'){
    this.authDialog.openDialog(mode);
  }

}
