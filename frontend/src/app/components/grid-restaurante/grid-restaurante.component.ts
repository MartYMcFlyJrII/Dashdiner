import { Component } from '@angular/core';

@Component({
  selector: 'app-grid-restaurante',
  templateUrl: './grid-restaurante.component.html',
  styleUrls: ['./grid-restaurante.component.css'],
})
export class GridRestauranteComponent {
  restaurantes: any[] = [];

  ngOnInit() {
    for (var i = 0; i < 6; i++) {
      this.restaurantes.push({
        titulo: 'Pizzeria',
        descripcion: 'Pizzas recien hechas',
        imagen:
          'https://media-cdn.tripadvisor.com/media/photo-s/19/76/f0/71/pizze-varie-di-gianni.jpg',
      });
    }
  }
  //@Output() seleccionado = new EventEmitter<Restaurante>();
  //restSeleccionado?: Restaurante;
  // ngOnChanges() {
  //   this.restSeleccionado = undefined;
  // }

  // seleccionar(restaurante: Restaurante) {
  //   this.restSeleccionado = restaurante;
  //   this.seleccionado.emit(restaurante);
  // }
}
