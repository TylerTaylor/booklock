import { Angular2TokenService } from 'angular2-token';
import { Router } from '@angular/router';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Component, OnInit } from '@angular/core';

import { FileUploader } from 'ng2-file-upload';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  bookmarks;
  loading: boolean = false;

  singleBookmark = {
    name: '',
    url: ''
  }

  constructor(private http: Http, private router: Router, private authService:Angular2TokenService) {
    // debugger;
  }

  ngOnInit() {
  }

  fileChange(event) {
    this.loading = true;

    let fileList: FileList = event.target.files;

    if (fileList.length > 0) {
      let file: File = fileList[0]

      let formData:FormData = new FormData();

      formData.append('uploadFile', file, file.name)

      let headers = new Headers()
      headers.append("access-token", this.authService.currentAuthData["accessToken"])
      headers.append("expiry", this.authService.currentAuthData["expiry"])
      headers.append("token-type", this.authService.currentAuthData["tokenType"])
      headers.append("uid", this.authService.currentAuthData["uid"])
      headers.append("client", this.authService.currentAuthData["client"])

      let options = new RequestOptions({ headers: headers })

      // Trying without xhr...

      // var xhr = new XMLHttpRequest()
      
      // xhr.upload.addEventListener("progress", (ev: ProgressEvent) => {
      //   // debugger;
      // })
      
      // xhr.open("POST", "http://localhost:3000/upload", true)
      
      // xhr.onreadystatechange = () => {
      //   if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200){
      //     this.router.navigate(['/bookmarks'])
      //   }
      // }

      // xhr.send(formData)

      this.http.post("http://localhost:3000/upload", formData, options)
        .map(res => res.json())
        .catch(error => Observable.throw(error))
        .subscribe(
          data => {
            console.log('success')
            this.loading = false;
            this.router.navigate(['/bookmarks'])
          },

          error => console.log(error)
        )
    }

    // this.router.navigate(['/bookmarks'])
  }

  createSingleBookmark() {
    // this.singleBookmark looks like this => 
    //   {name: "test", url: "http://tynicolas.com"}
    // The form is working.
    // Now we need to communicate with the backend and send our singleBookmark data
    // as well as our Auth headers

    let headers = new Headers()
    headers.append("access-token", this.authService.currentAuthData["accessToken"])
    headers.append("expiry", this.authService.currentAuthData["expiry"])
    headers.append("token-type", this.authService.currentAuthData["tokenType"])
    headers.append("uid", this.authService.currentAuthData["uid"])
    headers.append("client", this.authService.currentAuthData["client"])

    let options = new RequestOptions({ headers: headers })

    this.http.post("http://localhost:3000/upload_single", this.singleBookmark, options)
      .map(res => res.json())
      .catch(error => Observable.throw(error))
      .subscribe(
        data => {
          this.router.navigate(['/bookmarks'])
        },

        error => console.log(error)
      )
  }

}
