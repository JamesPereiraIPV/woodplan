import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Cartaz {
  id: number;
  barname: string;
  image: string;
  date: string;
  location: string;
  mapsLink: string;
}

@Injectable({
  providedIn: 'root',
})
export class CartazesService {
  private apiUrl = 'http://localhost:3000/cartazes'; // <- ajusta o URL do teu backend

  constructor(private http: HttpClient) {}

  getCartazes(): Observable<Cartaz[]> {
    return this.http.get<Cartaz[]>(this.apiUrl);
  }
}
