import { Angular2TokenService } from 'angular2-token';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/observable/of';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  private data;
  private observable: Observable<any>;

  constructor(private http:Http, private authService:Angular2TokenService) { }

  getData() {
    console.log("DataService getData called")
    if(this.data) {
      console.log('data already available!');
      // if 'data' is available just return it as 'Observable'
      return Observable.of(this.data);
    } else if (this.observable) {
      console.log('request pending');
      // if 'this.observable' is set then the request is in progress
      // return the 'Observable' for the ongoing request
      return this.observable;
    } else {
      console.log('send new request');
      let headers = new Headers();
      headers.append("access-token", this.authService.currentAuthData["accessToken"])
      headers.append("expiry", this.authService.currentAuthData["expiry"])
      headers.append("token-type", this.authService.currentAuthData["tokenType"])
      headers.append("uid", this.authService.currentAuthData["uid"])
      headers.append("client", this.authService.currentAuthData["client"])
      let options = new RequestOptions({ headers: headers })

      // create the request, store the 'Observable' for subsequent subscribers
      this.observable = this.http.get('http://localhost:3000/bookmarks.json', options)
        .map(response => {
          console.log('response arrived!');
          // when the cached data is available we don't need the 'Observable' reference anymore
          this.observable = null;

          if(response.status == 400) {
            return "FAILURE :(";
          } else if (response.status == 200) {
            this.data = response.json();
            return this.data;
          }
        })
        // make it shared so more than one subscriber can get the result
        .share();
        return this.observable;
    }
  }

}
