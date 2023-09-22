import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { API_URL } from '../env';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  constructor(private http: HttpClient) {}

  public get(): Observable<any> {
    return this.http.get(`${API_URL}/`);
  }

  public login(correo: string, password: string): Observable<any> {
    const body = { correo: correo, password: password };

    // Realiza una solicitud HTTP POST al servidor con el objeto JSON
    return this.http.post<any>(`${API_URL}/login`, body);
  }
}
