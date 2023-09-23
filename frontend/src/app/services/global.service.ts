import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { API_URL } from '../env';
import { User } from './user';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  logeado: BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);
  UserData: BehaviorSubject<User>=new BehaviorSubject<User>({id:0,nombre_usuario:"",nombre:"",apellido:"",correo:"",tipo:"",mensaje:"",logeado:false});
  constructor(private http: HttpClient) {}

  public get(): Observable<any> {
    return this.http.get(`${API_URL}/`);
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
