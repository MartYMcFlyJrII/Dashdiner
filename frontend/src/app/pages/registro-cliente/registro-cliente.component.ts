import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-registro-cliente',
  templateUrl: './registro-cliente.component.html',
  styleUrls: ['./registro-cliente.component.css']
})
export class RegistroClienteComponent {

registroForm = this.formBuilder.group({});//este objeto se usa para validar el formulario de registro de cliente

constructor(private formBuilder : FormBuilder,private globalService : GlobalService,private router : Router) {

 }

ngOnInit(): void {
}

registrarUsuario(){
  if(this.registroForm.valid){
    //se obtiene el correo para verificar que no exista en la base de datos
    const correo = (document.getElementById('email') as HTMLInputElement).value;
    //se manda a llamar el metodo de verificacion de existencia de correo de global service
    this.globalService.existingEmail(correo).subscribe(response => {
      //en caso de que el correo no exista en la base de datos se procede a registrar el usuario
      if(response.existe == false){
        //se obtienen los datos del formulario
        const nombre = (document.getElementById('firstName') as HTMLInputElement).value;
        const apellido = (document.getElementById('lastName') as HTMLInputElement).value;
        const numeroTelefono = (document.getElementById('phone') as HTMLInputElement).value;
        const password = (document.getElementById('password') as HTMLInputElement).value;
        const password2 = (document.getElementById('confpassword') as HTMLInputElement).value;
        //se verifica que las contraseñas coincidan
        if(password == password2){
          const Usuario = {
            nombre_usuario: correo,
            correo: correo,
            password: password,
            celular: numeroTelefono,
            nombre: nombre,
            apellido: apellido,
            rfc: null,
            tipo: "cliente"
          }
          //se manda a llamar el metodo de registro de cliente de global service
          this.globalService.registro(Usuario).subscribe(response => {
            //si el usuario se registro correctamente se dirige a la pagina de inicio de sesion o la anterior visitada
            if(response.registrado){
              this.router.navigate(['/']);
            }
            else{alert("Ocurrio un error al registrar el usuario, intenta de nuevo");}
        });
  }
    else{alert("Las contraseñas no coinciden");}

}
  else{alert("El correo ya existe en la base de datos");}
  });
}}
}
