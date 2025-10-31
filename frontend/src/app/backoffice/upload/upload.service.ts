import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpEvent,
  HttpRequest,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  private apiUrlVideos = 'http://localhost:3000/videos/uploads';
  private apiUrlPhotos = 'http://localhost:3000/photos/uploads';
  private apiUrlCartazes = 'http://localhost:3000/cartazes/uploads';

  constructor(private http: HttpClient) {}

  uploadPhotos(files: File[], alt: string): Observable<HttpEvent<any>> {
    const formData = new FormData();
    files.forEach((file) => formData.append('photos', file));
    formData.append('alt_text', alt);

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const req = new HttpRequest('POST', this.apiUrlPhotos, formData, {
      reportProgress: true,
      headers,
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

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const req = new HttpRequest('POST', this.apiUrlVideos, formData, {
      reportProgress: true,
      headers,
    });

    return this.http.request(req);
  }

  uploadCartaz(
    file: File,
    barname: string,
    date: string,
    location: string,
    mapsLink: string
  ): Observable<HttpEvent<any>> {
    const formData = new FormData();
    formData.append('cartazes', file);
    formData.append('barname', barname);
    formData.append('date', date);
    formData.append('location', location);
    formData.append('mapsLink', mapsLink);

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const req = new HttpRequest('POST', this.apiUrlCartazes, formData, {
      reportProgress: true,
      headers,
    });

    return this.http.request(req);
  }
}
