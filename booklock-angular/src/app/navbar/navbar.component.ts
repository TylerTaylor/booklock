import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthDialogComponent } from '../auth-dialog/auth-dialog.component';

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

  constructor() { }

  ngOnInit() {
  }

  // Shows the auth-dialog component with the appropriate form
  presentAuthDialog(mode?: 'login' | 'register'){
    this.authDialog.openDialog(mode);
  }

}
