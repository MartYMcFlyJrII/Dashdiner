import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { API_URL } from '../env';
import { Restaurante } from '../models/restaurante';
import { catchError, of } from 'rxjs';
import { Producto } from '../models/producto';
import { Categoria } from '../models/categoria';
import { Opcion } from '../models/opcion';
import { Seleccion } from '../models/seleccion';
import { User } from './user';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  logeado: BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);
  UserData: BehaviorSubject<User>=new BehaviorSubject<User>({id:0,nombre_usuario:"",nombre:"",apellido:"",correo:"",tipo:"",mensaje:"",logeado:false});
  
  constructor(private http: HttpClient) {}

  public getAllRestaurantes(): Observable<Restaurante[]> {
    return this.http.get<Restaurante[]>(`${API_URL}/restaurantes`);
  }
  public getPromociones(id_restaurante: number): Observable<Producto[]> {
    return this.http.get<Producto[]>(
      `${API_URL}/promociones/${id_restaurante}`
    );
  }

  public eliminarCategoria(c: Categoria): Observable<any> {
    return this.http.delete(`${API_URL}/eliminar_categoria`, {
      params: { index: c.id },
    });
  }
  public eliminarSelecciones(eliminados: number[]): Observable<any> {
    return this.http.delete(`${API_URL}/eliminar_selecciones`, {
      params: { indexes: eliminados },
    });
  }

  public eliminarOpciones(eliminados: number[]): Observable<any> {
    return this.http.delete(`${API_URL}/eliminar_opciones`, {
      params: { indexes: eliminados },
    });
  }

  public guardarProducto(prodcuto: any): Observable<any> {
    if (prodcuto.id == 0) {
      return this.http.post(`${API_URL}/producto`, prodcuto);
    }
    return this.http.put(`${API_URL}/producto`, prodcuto);
  }

  public guardarCategoria(cat: any): Observable<any> {
    if (cat.id == 0) {
      return this.http.post(`${API_URL}/categoria`, cat);
    }
    return this.http.put(`${API_URL}/categoria`, cat);
  }

  public guardarOpcion(opcion: any): Observable<any> {
    if (opcion.id == 0) {
      return this.http.post(`${API_URL}/opcion`, opcion);
    }
    return this.http.put(`${API_URL}/opcion`, opcion);
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

  public getCategoria(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(`${API_URL}/categoria/${id}`);
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

  public getRestauranteAdmin(
    id_administrador: number
  ): Observable<Restaurante> {
    return this.http.get<Restaurante>(
      `${API_URL}/restaurante_admin/${id_administrador}`
    );
  }
  public getRestaurante(id: number): Observable<Restaurante> {
    return this.http.get<Restaurante>(`${API_URL}/restaurante/${id}`);
  }

  public login(correo: string, password: string): Observable<any> {
    const body = { correo: correo, password: password };

    // Realiza una solicitud HTTP POST al servidor con el objeto JSON
    return this.http.post<any>(`${API_URL}/login`, body);
  }
  get User_Data():Observable<User>{
    return this.UserData.asObservable();
  }
  
  get Logeado():Observable<boolean>{
    return this.logeado.asObservable();
  }

  setLogeado(value:boolean){
    this.logeado.next(value);
  }
}
