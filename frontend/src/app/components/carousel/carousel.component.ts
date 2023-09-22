import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Producto } from 'src/app/models/producto';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})
export class CarouselComponent {
  @Input() promociones: Producto[] = [];
  constructor(private dialog: MatDialog) {}

  openModal(prod: Producto) {
    this.dialog.open(DialogComponent, {
      width: '80%',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      data: {
        producto: prod,
      },
    });
  }
}
