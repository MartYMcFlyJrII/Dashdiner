import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { API_URL } from '../env';
import { Restaurante } from '../models/restaurante';
import { catchError, of } from 'rxjs';
import { Producto } from '../models/producto';
import { Categoria } from '../models/categoria';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  constructor(private http: HttpClient) {}

  public getAllRestaurantes(): Observable<Restaurante[]> {
    return this.http.get<Restaurante[]>(`${API_URL}/restaurantes`);
  }

  public getMenu(id_restaurante: number): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${API_URL}/menu/${id_restaurante}`);
  }

  public getCategorias(id_restaurante: number): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(
      `${API_URL}/categorias/${id_restaurante}`
    );
  }

  public getMenuPorCategoria(
    id_restaurante: number,
    id_categoria: number
  ): Observable<Producto[]> {
    return this.http.get<Producto[]>(
      `${API_URL}/menu/${id_restaurante}/${id_categoria}`
    );
  }
  public getRestaurante(id: number): Observable<Restaurante> {
    return this.http.get<Restaurante>(`${API_URL}/restaurante/${id}`);
  }
}
