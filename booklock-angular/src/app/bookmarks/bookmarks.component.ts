import { Angular2TokenService } from 'angular2-token';
import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css']
})
export class BookmarksComponent implements OnInit {
  title = 'Bookmarks';
  bookmarks;
  page: number = 1;

  loading: boolean = false;

  constructor(private http: Http, private authService: Angular2TokenService) { }

  ngOnInit() {
    // Starts our loading spinner, which disappears when our data loads 
    this.loading = true;

    let headers = new Headers();
    headers.append("access-token", this.authService.currentAuthData["accessToken"])
    headers.append("expiry", this.authService.currentAuthData["expiry"])
    headers.append("token-type", this.authService.currentAuthData["tokenType"])
    headers.append("uid", this.authService.currentAuthData["uid"])
    headers.append("client", this.authService.currentAuthData["client"])
    let options = new RequestOptions({ headers: headers })

    this.http.get('http://localhost:3000/bookmarks.json', options)
      .subscribe(res => {
        this.loading = false;
        this.bookmarks = res.json();
      })
  }

  deleteBookmark(id) {
    if(confirm("Are you sure you want to delete this bookmark?")){
      console.log("We can send a delete request to rails here. Remember to pass in the auth headers. Probably should refactor this component now.")

      // TODO: Should probably clean up this repetitive code
      let headers = new Headers();
      headers.append("access-token", this.authService.currentAuthData["accessToken"])
      headers.append("expiry", this.authService.currentAuthData["expiry"])
      headers.append("token-type", this.authService.currentAuthData["tokenType"])
      headers.append("uid", this.authService.currentAuthData["uid"])
      headers.append("client", this.authService.currentAuthData["client"])
      let options = new RequestOptions({ headers: headers })

      // First delete from rails backend, then delete from our JS bookmarks collection
      this.http.delete('http://localhost:3000/bookmarks/' + id, options)
        .subscribe(res => {
          this.bookmarks = this.bookmarks.filter(bookmark => bookmark.id !== id)
        })
    }
  }

}
