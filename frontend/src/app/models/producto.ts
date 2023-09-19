export class Producto {
  id?: number;
  id_restaurante?: number;
  id_categoria?: number;
  nombre: string = '';
  descripcion: string = '';
  precio?: number;
  estado: boolean = false;
  imagen: string = '';

  constructor(
    id: number,
    id_restaurante: number,
    id_categoria: number,
    nombre: string,
    descripcion: string,
    precio: number,
    estado: boolean,
    imagen: string
  ) {
    this.id = id;
    this.id_restaurante = id_restaurante;
    this.id_categoria = id_categoria;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precio = precio;
    this.estado = estado;
    this.imagen = imagen;
  }
}
