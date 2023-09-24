import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service'; // Ajusta la ruta adecuada


@Component({
  selector: 'app-registro-restaurante',
  templateUrl: './registro-restaurante.component.html',
  styleUrls: ['./registro-restaurante.component.css']
})
export class RegistroRestauranteComponent {
    registroForm = this.formBuilder.group({

  });
 
    constructor(private formBuilder: FormBuilder, private globalService: GlobalService, private router: Router) {
    }
  
    ngOnInit(): void {
    }

    registrarAdmin(){
      if(this.registroForm.valid){
        //se obtiene el correo del formulario
        const correo = (document.getElementById('email') as HTMLInputElement).value;
        //se manda a llamar el metodo de verificacion de existencia de correo de global service
        this.globalService.existingEmail(correo).subscribe(response => {
          //si el correo no existe en la base de datos se procede a registrar el usuario
          if(response.existe == false){
            //se obtienen lo datos del formulario
            const nombre = (document.getElementById('firstName') as HTMLInputElement).value;
            const apellido = (document.getElementById('lastName') as HTMLInputElement).value;
            const numeroTelefono = (document.getElementById('phone') as HTMLInputElement).value;
            const password = (document.getElementById('password') as HTMLInputElement).value;
            const password2 = (document.getElementById('confpassword') as HTMLInputElement).value;
            const rfc = (document.getElementById('rfc') as HTMLInputElement).value;
            //se verifica que las contraseñas coincidan
            if(password == password2){
              //se crea el objeto restaurante
              const Usuario = {
                nombre_usuario: nombre +" "+ apellido,
                correo: correo,
                password: password,
                celular: numeroTelefono,
                nombre: nombre,
                apellido: apellido,
                rfc: rfc,
                tipo: "admin"
              }
              //se manda a llamar el metodo de registro de restaurante de global service
              this.globalService.registroAdmin(Usuario).subscribe(response => {
                if(response.registrado){
                  //se dirige a la pagina siguiente, para terminar el registro del restaurante
                  this.router.navigate(['/']);
                }
                else{alert("Ocurrio un error al registrar el restaurante, intenta de nuevo");}
              });
            }
            else{alert("Las contraseñas no coinciden");}
          }
          else{alert("El correo ya existe en la base de datos, intenta con otro");}
        });
      }
      else{
        this.registroForm.markAllAsTouched();
        alert("Datos incorrectos");
      }
    }
  }
