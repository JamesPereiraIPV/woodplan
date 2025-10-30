import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  private apiUrlVideos = 'http://localhost:3000/videos/uploads';
  private apiUrlPhotos = 'http://localhost:3000/photos/uploads';

  constructor(private http: HttpClient) {}

  uploadPhotos(files: File[], alt: string): Observable<HttpEvent<any>> {
    const formData = new FormData();
    files.forEach((file) => formData.append('photos', file));
    formData.append('alt_text', alt);

    const req = new HttpRequest('POST', this.apiUrlPhotos, formData, {
      reportProgress: true,
    });

    return this.http.request(req);
  }

  uploadVideo(
    file: File,
    title: string,
    thumbnail?: string
  ): Observable<HttpEvent<any>> {
    const formData = new FormData();
    formData.append('videos', file);
    formData.append('title', title);
    if (thumbnail) {
      formData.append('thumbnail', thumbnail);
    }

    const req = new HttpRequest(
      'POST',
      `${this.apiUrlVideos}`,
      formData,
      {
        reportProgress: true,
      }
    );

    return this.http.request(req);
  }
}
