import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service'; // Ajusta la ruta adecuada

@Component({
  selector: 'app-registro-restaurante',
  templateUrl: './registro-restaurante.component.html',
  styleUrls: ['./registro-restaurante.component.css'],
})
export class RegistroRestauranteComponent {
  part2: boolean = false;
  url = { type: 'image/png', url: '/assets/placeholder.png', blob: '' };
  registroForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    username: ['', [Validators.required]],
    nombre: ['', [Validators.required]],
    apellido: ['', [Validators.required]],
    celular: ['', [Validators.required]],
    password: ['', [Validators.required]],
    confPassword: ['', [Validators.required]],
    rfc: ['', [Validators.required]],
    nombreRest: ['', [Validators.required]],
    celularRest: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
    horario: ['', [Validators.required]],
    direccion: ['', [Validators.required]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private globalService: GlobalService,
    private router: Router
  ) {}

  onSelectFile(e: any) {
    if (e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.url = {
          type: e.target.files[0].type,
          url: event.target.result,
          blob: event.target.result.split(',')[1],
        };
        console.log(this.url);
      };
    }
  }
  ngOnInit(): void {}

  registrarAdmin() {
    console.log(this.registroForm);
    if (this.registroForm.valid) {
      //se obtiene el correo del formulario
      const correo = this.registroForm.controls.email.value || '';
      //se manda a llamar el metodo de verificacion de existencia de correo de global service
      this.globalService.existingEmail(correo).subscribe((response) => {
        //si el correo no existe en la base de datos se procede a registrar el usuario
        if (response.existe == false) {
          //se obtienen lo datos del formulario
          const nombre = this.registroForm.controls.nombre.value || '';
          const apellido = this.registroForm.controls.apellido.value || '';
          const numeroTelefono = this.registroForm.controls.celular.value || '';
          const password = this.registroForm.controls.password.value || '';
          const password2 = this.registroForm.controls.confPassword.value || '';
          const rfc = this.registroForm.controls.rfc.value || '';
          const nombreRest = this.registroForm.controls.nombreRest.value || '';
          const celularRest =
            this.registroForm.controls.celularRest.value || '';
          const descripcion =
            this.registroForm.controls.descripcion.value || '';
          const horario = this.registroForm.controls.horario.value || '';
          const direccion = this.registroForm.controls.direccion.value || '';

          //const logo = this.registroForm.controls.logo.value || '';
          //se verifica que las contraseñas coincidan
          if (password == password2) {
            //se crea el objeto restaurante
            const Usuario = {
              nombre_usuario: correo,
              correo: correo,
              password: password,
              celular: numeroTelefono,
              nombre: nombre,
              apellido: apellido,
              rfc: rfc,
              tipo: 'admin',
            };
            const Restaurante = {
              nombre: nombreRest,
              descripcion: descripcion,
              horario: horario,
              direccion: direccion,
              logo: this.url,
              celular: celularRest,
            };

            //se manda a llamar el metodo de registro de restaurante de global service
            this.globalService
              .registro(Usuario, Restaurante)
              .subscribe((response) => {
                if (response.registrado) {
                  //se dirige a la pagina siguiente, para terminar el registro del restaurante
                  this.router.navigate(['/']);
                } else {
                  alert(
                    'Ocurrio un error al registrar el restaurante, intenta de nuevo'
                  );
                }
              });
          } else {
            alert('Las contraseñas no coinciden');
          }
        } else {
          alert('El correo ya existe en la base de datos, intenta con otro');
        }
      });
    } else {
      this.registroForm.markAllAsTouched();
      alert('Datos incorrectos');
    }
  }
}
