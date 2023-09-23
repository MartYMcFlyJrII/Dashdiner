import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import { DialogComponent } from '../dialog/dialog.component';
import { Restaurante } from 'src/app/models/restaurante';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
})
export class GridComponent {
  @Input() restaurante?: boolean;
  @Input() editable?: boolean;
  @Input() producto?: boolean;
  @Output() editar = new EventEmitter();
  @Output() cambiados = new EventEmitter<Producto>();
  @Input() items: any[] = [];
  mensaje: any;
  @Output() seleccionado = new EventEmitter<Producto>();
  itemSeleccionado?: Producto;

  constructor(private router: Router, private dialog: MatDialog) {}
  ngOnInit() {}

  seleccionar(prod: Producto) {
    this.openModal(prod, DialogComponent);
  }

  desactivarProducto(prod: Producto) {
    this.openModal(prod, DialogComponent);
  }
  editarProducto(prod: Producto) {
    this.editar.emit(prod);
  }

  openModal(prod: Producto, component: any) {
    var _popup = this.dialog.open(component, {
      width: '80%',
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

  cambiarEstado(prod: Producto) {
    prod.estado = !prod.estado;

    this.cambiados.emit(prod);

    // this.service.guardarProducto(prod).subscribe((response) => {
    //   this.mensaje = response;
    // });
  }
}
