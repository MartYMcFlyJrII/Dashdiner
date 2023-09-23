import { Component, Inject, Input } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GlobalService } from 'src/app/services/global.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-opcion-form',
  templateUrl: './opcion-form.component.html',
  styleUrls: ['./opcion-form.component.css'],
})
export class OpcionFormComponent {
  opcionGroup: FormGroup = new FormGroup({
    id: this.buildr.control(0),
    id_producto: this.buildr.control(0),
    multiple: this.buildr.control(false),
    titulo: this.buildr.control(''),
    selecciones_disponibles: this.buildr.array([]), // Form array for selecciones_disponibles
  });
  seleccionGroup: FormArray = new FormArray<FormGroup>([]);
  closemessage = {
    tipo: 'success',
    contenido: 'Los cambios se han cambiado de manera exitosa.',
  };
  title: string = '';
  constructor(
    @Inject(MAT_DIALOG_DATA) public datos: any,
    private buildr: FormBuilder,
    private ref: MatDialogRef<DialogComponent>,
    private service: GlobalService
  ) {}

  ngOnInit(): void {
    if (this.datos.code > 0) {
      this.title = 'Editar opción';
      this.recibirInformacionOpcion(this.datos.code);
    } else {
      this.title = 'Agregar opción';
    }
  }
  closeModal(success = false) {
    var msg = success ? this.closemessage : '';
    this.ref.close(msg);
  }

  getControl(index: number, col: string) {
    return this.seleccionGroup.at(index).get(col) as FormControl;
  }
  recibirInformacionOpcion(index: number) {
    this.service.getOpcion(index).subscribe((opcionData: any) => {
      // Populate selecciones_disponibles
      opcionData.selecciones_disponibles.forEach((seleccionData: any) => {
        this.opcionGroup.get('selecciones_disponibles') as FormArray;
        const seleccionGroup = this.buildr.group({
          id: seleccionData.id,
          nombre: seleccionData.nombre,
          precio: seleccionData.precio,
          estado: seleccionData.estado,
        });
        (this.opcionGroup.get('selecciones_disponibles') as FormArray).push(
          seleccionGroup
        );

        this.opcionGroup.patchValue({
          id: opcionData.id,
          id_producto: opcionData.id_producto,
          multiple: opcionData.multiple,
          titulo: opcionData.titulo,
        });
      });
    });
    this.seleccionGroup = this.opcionGroup.get(
      'selecciones_disponibles'
    ) as FormArray;
    console.log('AQUI ');
    console.log(this.opcionGroup);
  }
}
