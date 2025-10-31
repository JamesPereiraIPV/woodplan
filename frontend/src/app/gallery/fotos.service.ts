import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Fotos {
  id: number;
  image_url: string;   
  alt_text: string;   
  created_at: string;  
}

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private apiUrl = 'http://localhost:3000/photos';

  constructor(private http: HttpClient) {}

  getVideos(): Observable<Fotos[]> {
    return this.http.get<Fotos[]>(this.apiUrl);
  }
}