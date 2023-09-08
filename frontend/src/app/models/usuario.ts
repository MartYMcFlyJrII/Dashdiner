export class Usuario {
  id?: number;
  nombre_usuario: string = '';
  correo: string = '';
  celular: string = '';
  nombre: string = '';
  apellido: string = '';
  contraseña: string = '';
  tipo: string = ''; //admin o cliente
  rfc?: string; //nulo si es tipo cliente
}
