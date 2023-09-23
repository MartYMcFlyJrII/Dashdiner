import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { API_URL } from '../env';
import { Restaurante } from '../models/restaurante';
import { catchError, of } from 'rxjs';
import { Producto } from '../models/producto';
import { Categoria } from '../models/categoria';
import { Opcion } from '../models/opcion';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  constructor(private http: HttpClient) {}

  public getAllRestaurantes(): Observable<Restaurante[]> {
    return this.http.get<Restaurante[]>(`${API_URL}/restaurantes`);
  }
  public getPromociones(id_restaurante: number): Observable<Producto[]> {
    return this.http.get<Producto[]>(
      `${API_URL}/promociones/${id_restaurante}`
    );
  }

  public getOpciones(id_producto: number): Observable<Opcion[]> {
    return this.http.get<Opcion[]>(`${API_URL}/opciones/${id_producto}`);
  }
  public getOpcion(id_producto: number): Observable<Opcion> {
    return this.http.get<Opcion>(`${API_URL}/opcion/${id_producto}`);
  }

  public getProducto(id_producto: number): Observable<Producto> {
    return this.http.get<Producto>(`${API_URL}/producto/${id_producto}`);
  }
  public getProductos(id_administrador: number): Observable<Producto[]> {
    return this.http.get<Producto[]>(
      `${API_URL}/productos/${id_administrador}`
    );
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
