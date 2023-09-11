import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
})
export class GridComponent {
  @Input() producto?: boolean;
  items: any[] = [];
  constructor(private router: Router) {}
  ngOnInit() {
    for (var i = 0; i < 6; i++) {
      this.items.push({
        titulo: 'Pizzeria',
        descripcion: 'Pizzas recien hechas',
        precio: 100.0,
        imagen:
          'https://media-cdn.tripadvisor.com/media/photo-s/19/76/f0/71/pizze-varie-di-gianni.jpg',
      });
    }
  }

  redirect(pagename: string) {
    this.router.navigate(['/' + pagename]);
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
