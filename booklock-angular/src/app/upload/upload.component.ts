import { Http, RequestOptions, Headers } from '@angular/http';
import { Component, OnInit } from '@angular/core';

import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  bookmarks;

  constructor(private http: Http) { }

  ngOnInit() {
  }

  fileChange(event) {
    let fileList: FileList = event.target.files;

    if (fileList.length > 0) {
      let file: File = fileList[0]

      let formData:FormData = new FormData();

      formData.append('uploadFile', file, file.name)

      let headers = new Headers()
      let options = new RequestOptions({ headers: headers })

      var xhr = new XMLHttpRequest()

      xhr.upload.addEventListener("progress", (ev: ProgressEvent) => {
        // debugger;
      })

      xhr.open("POST", "http://localhost:3000/upload", true)
      xhr.send(formData)
    }
  }

}
