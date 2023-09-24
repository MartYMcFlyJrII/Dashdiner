export class Usuario {
  id?: number;
  nombre_usuario: string = '';
  correo: string = '';
  celular: string = '';
  nombre: string = '';
  apellido: string = '';
  tipo: string = ''; //admin o cliente
  rfc?: string; //nulo si es tipo cliente
  mensaje: string = '';
  logeado: boolean = false;
}
