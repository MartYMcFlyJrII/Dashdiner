import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { GlobalService } from 'src/app/services/global.service';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  producto: any;
  form: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public datos: any,
    private formBuilder: FormBuilder,
    private ref: MatDialogRef<DialogComponent>,
    private service: GlobalService
  ) {}

  ngOnInit(): void {
    this.producto = this.datos.formGroup;
    if (this.datosInput.code > 0) {
      this.recibirInformacion(this.datosInput.code);
    }
    this.form = this.formBuilder.group({
      id: this.producto.id,
      id_restaurante: this.producto.id_restaurante,
      id_categoria: this.producto.id_categoria,
      nombre: this.producto.nombre,
      descripcion: this.producto.descripcion,
      precio: this.producto.precio,
      imagen: this.producto.imagen,
      estado: this.producto.estado,
      opciones: this.buildOpciones(this.producto.opciones),
    });
  }

  get productos(): FormArray {
    return this.form.get('productos') as FormArray;
  }

  buildOpciones(productos: { phoneNo: string; emailAddr: string }[] = []) {
    return this.formBuilder.array(
      productos.map((producto) => this.formBuilder.group(producto))
    );
  }

  addproductoField() {
    this.productos.push(
      this.formBuilder.group({ phoneNo: null, emailAddr: null })
    );
  }

  removeproductoField(index: number): void {
    if (this.productos.length > 1) this.productos.removeAt(index);
    else this.productos.patchValue([{ phoneNo: null, emailAddr: null }]);
  }

  submit(value: any): void {
    console.log(value);
  }

  reset(): void {
    this.form.reset();
    this.productos.clear();
    this.addproductoField();
  }

  datosInput: any;
  proyector: any;
  mensaje: any;
  closemessage = {
    tipo: 'success',
    contenido: 'Los cambios se han cambiado de manera exitosa.',
  };
  url = '/assets/placeholder.png';
  // constructor(
  //   @Inject(MAT_DIALOG_DATA) public datos: any,
  //   private ref: MatDialogRef<DialogComponent>,
  //   private service: GlobalService
  // ) {}

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
  recibirInformacion(code: number) {
    // this.service.getProyector(code).subscribe((item) => {
    //   this.proyector = item;
    //   this.datosInput.formGroup.setValue({
    //     id: this.proyector.id,
    //     nombre: this.proyector.nombre,
    //     fechaAgregado: this.proyector.fechaAgregado,
    //     serie: this.proyector.serie,
    //     estatus: this.proyector.estatus,
    //   });
    // });
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
}
