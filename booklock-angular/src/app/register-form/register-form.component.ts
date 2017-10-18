import { Angular2TokenService } from 'angular2-token';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  signUpUser = {
    email: '',
    password: '',
    passwordConfirmation: ''
  };

  @Output() onFormResult = new EventEmitter<any>();

  constructor(private tokenAuthService:Angular2TokenService) { }

  ngOnInit() {
  }

  onSignUpSubmit(){

    this.tokenAuthService.registerAccount(this.signUpUser).subscribe(

      res => {
        if (res.status == 200) {
          this.onFormResult.emit({signedUp: true, res})
        }
      },

      err => {
        console.log(err.json())
        this.onFormResult.emit({signedUp: false, err})
      }

    )

  }

}
