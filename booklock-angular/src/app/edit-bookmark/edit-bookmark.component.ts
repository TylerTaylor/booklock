import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Angular2TokenService } from 'angular2-token';
import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'app-edit-bookmark',
  templateUrl: './edit-bookmark.component.html',
  styleUrls: ['./edit-bookmark.component.css']
})
export class EditBookmarkComponent implements OnInit {

  headers = new Headers();

  // bookmark = {
  //   name: '',
  //   url: '',
  //   tag_list: ''
  // }
  bookmark;

  constructor(private authService: Angular2TokenService, private http: Http, private route: ActivatedRoute, private router: Router) {
    this.headers.append("access-token", this.authService.currentAuthData["accessToken"])
    this.headers.append("expiry", this.authService.currentAuthData["expiry"])
    this.headers.append("token-type", this.authService.currentAuthData["tokenType"])
    this.headers.append("uid", this.authService.currentAuthData["uid"])
    this.headers.append("client", this.authService.currentAuthData["client"])
  }

  ngOnInit() {
    // Probably should get the bookmark object here. We don't need a rails request do we? Should have the JS object? Or get it? How!?
    // debugger;

    // Or do I just send a patch request to the rails update route? Will our bookmarks component auto update? Stay tuned!

    // Well we need the friggin bookmark data to edit in the first place sooo yes a get request of some sort is necessary

    let id = this.route.snapshot.params.id
    this.http.get('http://localhost:3000/bookmarks/' + id)
      .subscribe(res => {
        this.bookmark = res.json();
        // Materialize.updateTextFields();
        // Create a comma separated list for our input field, named tag_list for convenience when saving to rails db
        this.bookmark["tag_list"] = this.bookmark.tags.map(tag => tag.name).join(', ')
      })
  }


  editBookmark() {
    let options = new RequestOptions({ headers: this.headers })
    let id = this.route.snapshot.params.id
    this.http.patch('http://localhost:3000/bookmarks/' + id, this.bookmark, options)
      .map(res => res.json())
      .catch(error => Observable.throw(error))
      .subscribe(res => {
        this.router.navigate(['/bookmarks'])
      })
  }

}
