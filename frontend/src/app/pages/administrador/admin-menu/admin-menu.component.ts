import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from 'src/app/components/form/form.component';
import { Producto } from 'src/app/models/producto';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.css'],
})
export class AdminMenuComponent {
  @Input() producto?: Producto;
  productos: Producto[] = [];
  prodCambiados: Producto[] = [];
  mensaje: any;
  grid: boolean = true;
  table: boolean = false;
  columnasDisplay = [
    {
      key: 'id',
      header: 'Id',
    },
    {
      key: 'fechaAgregado',
      header: 'Fecha agregado',
    },
    {
      key: 'nombre',
      header: 'Nombre',
    },
    {
      key: 'serie',
      header: 'Número de serie',
    },
    {
      key: 'estatus',
      header: 'Estatus',
    },
    {
      key: 'editar',
      header: 'Editar',
    },
  ];
  constructor(
    private service: GlobalService,
    private buildr: FormBuilder,
    private dialog: MatDialog //public loaderService: LoaderService
  ) {}

  agregarProducto() {
    this.openModal(0, 'Agregar Producto', FormComponent);
  }

  editarProducto(proy: Producto) {
    var code = proy.id || 0;
    this.openModal(code, 'Editar Producto', FormComponent);
  }

  changeView(valor: boolean) {
    this.grid = valor;
  }
  openModal(code: number, title: string, component: any) {
    var _popup = this.dialog.open(component, {
      width: '70%',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      data: {
        title: title,
        code: code,
        formGroup: this.buildr.group({
          id: this.buildr.control(0),
          nombre: [null, Validators.required],
          serie: [null, Validators.required],
          estatus: this.buildr.control(false),
        }),
        formColumns: ['Nombre', 'Número de serie'],
      },
    });
    _popup.afterClosed().subscribe((item) => {
      this.mensaje = item;
      this.loadItems();
    });
  }

  agregarCambio(proy: Producto) {
    var index = this.prodCambiados.findIndex((obj) => obj.id === proy.id);

    if (index > -1) {
      this.prodCambiados.splice(index, 1);
    } else {
      this.prodCambiados.push(proy);
    }
  }

  guardar() {
    // this.proyCambiados.forEach((proy) => {
    //   this.service.guardarProyector(proy).subscribe((response) => {
    //     this.mensaje = response;
    //     this.proyCambiados = [];
    //   });
    // });
  }

  loadItems() {
    // this.service
    //   .getProyectores()
    //   .subscribe((result: Producto[]) => (this.proyectores = result));
  }

  ngOnInit(): void {
    this.loadItems();
  }
}
