import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Categoria } from 'src/app/models/categoria';
import { Producto } from 'src/app/models/producto';
import { Restaurante } from 'src/app/models/restaurante';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  id_restaurante: number = 0;
  productos: Producto[] = [];
  categorias: Categoria[] = [];
  restaurante: Restaurante = new Restaurante();
  categoria_seleccionada: Categoria = new Categoria();
  categoria_inicial: Categoria = new Categoria();
  promociones: Producto[] = [];
  constructor(private route: ActivatedRoute, private service: GlobalService) {}

  ngOnInit() {
    this.categoria_inicial.nombre = 'Todos los productos';
    this.categoria_inicial.id = 0;
    this.categoria_inicial = this.categoria_inicial;
    this.id_restaurante = parseInt(
      this.route.snapshot.paramMap.get('id') || '0'
    );
    this.loadItems();
  }

  actualizarProductos(id_categoria: any, categoria: Categoria) {
    if (id_categoria == 0) {
      this.getMenu();
    } else {
      this.service
        .getMenuPorCategoria(this.id_restaurante, id_categoria)
        .subscribe((result: Producto[]) => (this.productos = result));
    }

    this.categoria_seleccionada = categoria;
  }

  getMenu() {
    this.service
      .getMenu(this.id_restaurante)
      .subscribe((result: Producto[]) => (this.productos = result));
  }

  loadItems() {
    this.getMenu();

    this.service
      .getRestaurante(this.id_restaurante)
      .subscribe((result: Restaurante) => (this.restaurante = result));

    this.service
      .getCategorias(this.id_restaurante)
      .subscribe((result: Categoria[]) => (this.categorias = result));

    this.service
      .getPromociones(this.id_restaurante)
      .subscribe((result: Producto[]) => (this.promociones = result));
  }
}
