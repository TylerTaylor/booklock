import { Angular2TokenService } from 'angular2-token';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Response } from '@angular/http';

@Injectable()
export class AuthService {

  userSignedIn$:Subject<boolean> = new Subject();

  constructor(public authService:Angular2TokenService) {
    // debugger;
    this.authService.validateToken().subscribe(
      // res => res.status == 200 ? this.userSignedIn$.next(res.json().success) : this.userSignedIn$.next(false)
      res => {
        // debugger;
        if (res.status == 200) {
          this.userSignedIn$.next(res.json().success)
          // this.checkUser()
        } else {
          this.userSignedIn$.next(false)
        }
      }
    )
  }

  checkUser(){
    debugger;
  }

  logOutUser():Observable<Response>{
    return this.authService.signOut().map(
      res => {
        this.userSignedIn$.next(false);
        return res;
      }
    )
  }

  registerUser(signUpData: {email:string, password:string, passwordConfirmation:string}):Observable<Response>{
    return this.authService.registerAccount(signUpData).map(
      res => {
        this.userSignedIn$.next(true);
        return res;
      }
    )
  }

  logInUser(signInData: {email:string, password:string}):Observable<Response>{
    return this.authService.signIn(signInData).map(
      res => {
        this.userSignedIn$.next(true);
        return res;
      }
    )
  }

}
