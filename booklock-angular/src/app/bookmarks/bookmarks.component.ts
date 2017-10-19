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

  loading: boolean = false;

  constructor(private http: Http) { }

  ngOnInit() {
    // Starts our loading spinner, which disappears when our data loads 
    this.loading = true;

    this.http.get('http://localhost:3000/bookmarks.json')
      .subscribe(res => {
        this.loading = false;
        this.bookmarks = res.json();
      })
  }

  fileChange(event){
    
  }

}
