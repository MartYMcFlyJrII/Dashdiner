import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Opcion } from 'src/app/models/opcion';
import { Producto } from 'src/app/models/producto';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent {
  decimal(n: any) {
    return Number(n).toFixed(2);
  }
  producto: any;
  opciones: Opcion[] = [];
  mensaje: any;
  closemessage = {
    tipo: 'success',
    contenido: 'Los cambios se han cambiado de manera exitosa.',
  };
  constructor(
    @Inject(MAT_DIALOG_DATA) public datos: any,
    private ref: MatDialogRef<DialogComponent>,
    private service: GlobalService
  ) {}
  ngOnInit(): void {
    this.producto = this.datos.producto;
    if (this.producto.id > 0) {
      this.recibirInformacion(this.producto.id);
    }
  }

  recibirInformacion(code: number) {
    this.service.getOpciones(code).subscribe((result) => {
      this.opciones = result;
    });
  }

  closeModal(success = false) {
    var msg = success ? this.closemessage : '';
    this.ref.close(msg);
  }

  guardar() {
    // if (this.datosInput.formGroup.valid) {
    //   this.service.guardarProyector(this.datosInput.formGroup.value).subscribe({
    //     complete: () => {
    //       this.closeModal(true);
    //     }, // completeHandler
    //     error: (e) => {
    //       console.log(e);
    //       this.mensaje = e.error;
    //     }, // errorHandler
    //   });
    // } else {
    //   this.mensaje = {
    //     tipo: 'error',
    //     contenido: 'Por favor, llene todos los campos.',
    //   };
  }
}
