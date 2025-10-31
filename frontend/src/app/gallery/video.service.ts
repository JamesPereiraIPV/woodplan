import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Video {
  id: number;
  src: string;
  title: string;
  thumbnail: string;
}

@Injectable({
  providedIn: 'root' // serviço global
})
export class VideoService {
  private apiUrl = 'https://woodplan.onrender.com/videos';

  constructor(private http: HttpClient) {}

  getVideos(): Observable<Video[]> {
    return this.http.get<Video[]>(this.apiUrl);
  }
}
