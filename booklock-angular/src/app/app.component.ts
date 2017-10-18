import { environment } from '../environments/environment';
import { Angular2TokenService } from 'angular2-token';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private authToken: Angular2TokenService){
    this.authToken.init(environment.token_auth_config);

    this.authToken.signIn({email: 'test@test.com', password: 'password'}).subscribe(

      res => {
        console.log('auth response: ', res);
        console.log('auth response headers: ', res.headers.toJSON());
        console.log('auth response body: ', res.json());
      },

      err => {
        console.error('auth error: ', err);
      }

    )
  }
}
