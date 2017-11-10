import { FilterPipe } from './../filter.pipe';
import { Angular2TokenService } from 'angular2-token';
import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css']
})
export class BookmarksComponent implements OnInit {
  title = 'Bookmarks';
  page: number = 1;
  bookmarks;
  sortedBookmarks;
  tagToFilter;
  filters: Array<string> = [
    'Date Added',
    'Most Viewed',
    'A-Z'
  ]
  selectedFilter = this.filters[0];
  filterVar = '-created_at';

  loading: boolean = false;
  moreTags: boolean = false;

  headers = new Headers();

  constructor(private http: Http, private authService: Angular2TokenService, private route: ActivatedRoute, private filter: FilterPipe) {
    this.headers.append("access-token", this.authService.currentAuthData["accessToken"])
    this.headers.append("expiry", this.authService.currentAuthData["expiry"])
    this.headers.append("token-type", this.authService.currentAuthData["tokenType"])
    this.headers.append("uid", this.authService.currentAuthData["uid"])
    this.headers.append("client", this.authService.currentAuthData["client"])
  }

  ngOnInit() {

    let tagParam = this.route.snapshot.params.tag

    let params = {"tag": tagParam}

    // Starts our loading spinner, which disappears when our data loads 
    this.loading = true;

    let headers = new Headers();
    headers.append("access-token", this.authService.currentAuthData["accessToken"])
    headers.append("expiry", this.authService.currentAuthData["expiry"])
    headers.append("token-type", this.authService.currentAuthData["tokenType"])
    headers.append("uid", this.authService.currentAuthData["uid"])
    headers.append("client", this.authService.currentAuthData["client"])
    let options = new RequestOptions({ headers: headers, params: params })

    // If we have a tag param we need to pass it through to rails here. Otherwise make the request as normal.

    // if (tagParam) {
    //   this.http.get
    // } else {
    //   this.http.get('http://localhost:3000/bookmarks.json', options)
    //     .subscribe(res => {
    //       this.loading = false;
    //       this.bookmarks = res.json();
    //     })
    // }

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

  editBookmark(id) {
    let options = new RequestOptions({ headers: this.headers })
    debugger;
  }

  showMoreTags() {
    this.moreTags = true;
  }

  scrollUp() {
    window.scrollTo(0,0);
  }

  increaseViewCount(bookmarkId) {
    let options = new RequestOptions({ headers: this.headers })

    this.http.get('http://localhost:3000/add_viewing/' + bookmarkId, options)
      .subscribe(res => {
        let bookmark;
        let index = this.bookmarks.findIndex(x => x.id == bookmarkId)

        this.bookmarks[index] = res.json();
      })
  }

  linkClicked(bookmark) {
    this.increaseViewCount(bookmark.id)

    window.open(bookmark.url, "_blank")
  }

  filterByTag(value) {
    // simply sorting by one tag right now
    // problem is, how do i get back to the full list of bookmarks after being done filtering?
    this.tagToFilter = value.toLowerCase()
    this.sortedBookmarks = this.bookmarks.filter(bookmark => this.filter.filterTags(bookmark, value))
  }

  selectFilter(filter: string) {
    this.selectedFilter = filter;
 
    if (filter == "Date Added") {
      if (this.filterVar == "-created_at") {
        this.filterVar = 'created_at';
      } else {
        this.filterVar = '-created_at';
      }
    }

    if (filter == "Most Viewed") {
      if (this.filterVar == '-view_count') {
        this.filterVar = 'view_count';
      } else {
        this.filterVar = '-view_count';
      }
    }

    if (filter == "A-Z") {
      if (this.filterVar == 'name') {
        this.filterVar = '-name';
      } else {
        this.filterVar = 'name';
      }
    }
  }

  endFilter() {
    this.tagToFilter = null;
    this.sortedBookmarks = null;
  }

}
