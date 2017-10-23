import { Injectable } from '@angular/core';
import { CanActivate, Router } from "@angular/router";
import { Angular2TokenService } from "angular2-token";

@Injectable()
export class LoggedInGuard implements CanActivate {

  constructor(private authTokenService:Angular2TokenService,
              private router:Router){}
  
  canActivate() {
    if (this.authTokenService.userSignedIn()) {
      return false;
    } else {
      this.router.navigate(['/']);
      return true;
    }
  }

}