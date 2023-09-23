import { Opcion } from './opcion';

export class Producto {
  id?: number;
  id_restaurante?: number;
  id_categoria?: number;
  nombre: string = '';
  descripcion: string = '';
  precio?: number;
  estado: boolean = false;
  promocion: boolean = false;
  imagen: string = '';
  opciones: Opcion[] = [];
}
