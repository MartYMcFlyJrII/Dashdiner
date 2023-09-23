import { Component, Inject, Input } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { GlobalService } from 'src/app/services/global.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OpcionFormComponent } from '../opcion-form/opcion-form.component';
import { Opcion } from 'src/app/models/opcion';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  producto: any;
  opciones: Opcion[] = [];
  form: any;
  datosInput: any;
  mensaje: any;
  opcionesArray: FormArray = new FormArray<FormGroup>([]);
  closemessage = {
    tipo: 'success',
    contenido: 'Los cambios se han cambiado de manera exitosa.',
  };
  url = '/assets/placeholder.png';
  constructor(
    @Inject(MAT_DIALOG_DATA) public datos: any,
    private buildr: FormBuilder,
    private ref: MatDialogRef<DialogComponent>,
    private service: GlobalService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.form = this.datos.formGroup;
    if (this.datos.code > 0) {
      this.recibirInformacionProducto(this.datos.code);
    }
  }

  onSelectFile(e: any) {
    if (e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
        console.log(this.url);
      };
    }
  }

  createOpcionFields(): FormGroup {
    return this.buildr.group({
      id: this.buildr.control(0),
      id_producto: this.buildr.control(0),
      titulo: ['', Validators.required],
      multiple: this.buildr.control(false),
      selecciones_disponibles: this.buildr.array([]),
    });
  }

  createSeleccionFields(): FormGroup {
    return this.buildr.group({
      id: this.buildr.control(0),
      id_opcion: this.buildr.control(0),
      nombre: ['', Validators.required],
      precio: [null, Validators.required],
      estado: this.buildr.control(false),
    });
  }

  recibirInformacionOpciones(code: number): void {
    this.service.getOpciones(code).subscribe((result) => {
      this.opciones = result;
      // this.opcionesArray = this.form.get('opciones') as FormArray;

      // result.forEach((opcionData) => {
      //   const opcionGroup = this.buildr.group({
      //     id: opcionData.id,
      //     id_producto: opcionData.id_producto,
      //     multiple: opcionData.multiple,
      //     titulo: opcionData.titulo,
      //     selecciones_disponibles: this.buildr.array([]), // Form array for selecciones_disponibles
      //   });

      //   // Populate selecciones_disponibles
      //   opcionData.selecciones_disponibles.forEach((seleccionData) => {
      //     const seleccionGroup = this.buildr.group({
      //       id: seleccionData.id,
      //       nombre: seleccionData.nombre,
      //       precio: seleccionData.precio,
      //       estado: seleccionData.estado,
      //     });

      //     (opcionGroup.get('selecciones_disponibles') as FormArray).push(
      //       seleccionGroup
      //     );
      //   });

      //   this.opcionesArray.push(opcionGroup);
      // });
    });
  }
  recibirInformacionProducto(code: number) {
    this.service.getProducto(code).subscribe((result) => {
      this.producto = result;
      this.url = this.producto.imagen;
      this.recibirInformacionOpciones(this.producto.id);
      this.form.patchValue({
        id: this.producto.id,
        id_categoria: this.producto.id_categoria,
        nombre: this.producto.nombre,
        descripcion: this.producto.descripcion,
        precio: this.producto.precio,
        imagen: this.producto.imagen,
        estado: this.producto.estado,
        id_restaurante: this.producto.id_restaurante,
        promocion: this.producto.promocion,
      });
    });

    console.log(this.form);
  }

  agregarOpcion() {}

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
    // }
  }

  decimal(n: any) {
    return Number(n).toFixed(2);
  }

  openModal(code: number) {
    var _popup = this.dialog.open(OpcionFormComponent, {
      width: 'fit',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      data: {
        code: code,
        id_producto: this.datos.code,
      },
    });
  }
}