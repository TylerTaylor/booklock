import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.css']
})
export class AuthDialogComponent implements OnInit {

  // authMode input decorator takes two possible values and defaults to 'login'
  // This allows us to pick the right form to display
  @Input('auth-mode') authMode: 'login' | 'register' = 'login';

  // Event emitter required by the Materialize Dialog Directive.
  // We will emit events on it to open or close our dialog.
  modalActions = new EventEmitter<string|MaterializeAction>();

  constructor() { }

  // This sets the current authMode and displays the proper dialog.
  // We are emitting an action from the modalActions event emitter
  openDialog(mode: 'login' | 'register' = 'login'){
    this.authMode = mode;
    this.modalActions.emit({action: 'modal', params:['open']});
  }

  ngOnInit() {
  }

  // These will help us conditionally display the proper form
  isLoginMode(){return this.authMode == 'login'}
  isRegisterMode(){return this.authMode == 'register'}

}
