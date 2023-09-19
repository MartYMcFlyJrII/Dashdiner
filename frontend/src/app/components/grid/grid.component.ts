import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
})
export class GridComponent {
  @Input() producto?: boolean;
  items: any[] = [];
  mensaje: any;
  @Output() seleccionado = new EventEmitter<Producto>();
  constructor(private router: Router, private dialog: MatDialog) {}
  p: Producto = new Producto(
    1,
    1,
    1,
    'Pizza pepperoni',
    'Pizza con queso y pepperonni',
    120.5,
    true,
    'https://placeralplato.com/files/2016/01/Pizza-con-pepperoni-640x480.jpg'
  );
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

  seleccionar(prod: Producto) {
    this.openModal(prod, DialogComponent);
  }

  openModal(prod: Producto, component: any) {
    var _popup = this.dialog.open(component, {
      width: '70%',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      data: {
        producto: prod,
      },
    });
    _popup.afterClosed().subscribe((item) => {
      this.mensaje = item;
    });
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
