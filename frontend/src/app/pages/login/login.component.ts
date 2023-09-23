import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service'; // Ajusta la ruta adecuada
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import {User} from 'src/app/services/user'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = this.formBuilder.group({
    email: ['',[Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  constructor(private globalService: GlobalService, private router: Router, private formBuilder:FormBuilder) {}
  ngOnInit(): void {
    
  }

  get email() { return this.loginForm.controls.email; }
  get password() { return this.loginForm.controls.password; }
  login(){
    if(this.loginForm.valid){
      const correo = (document.getElementById('email') as HTMLInputElement).value;; // Obtén el correo del usuario desde tu formulario
      const password = (document.getElementById('password') as HTMLInputElement).value;; // Obtén la contraseña del usuario desde tu formulario
  
      // Llama al método login de GlobalService
      this.globalService.login(correo,password).subscribe(response => {
        if (response.logeado) {
          // Autenticación exitosa, redirige a la página de inicio (home)
          this.router.navigateByUrl('/');
          this.loginForm.reset();
          this.globalService.setLogeado(true);
          //setLogeado(true);
          console.log(this.globalService.logeado);
        } else {
          alert("No existe el usuario o la contraseña es incorrectas, intenta de nuevo");
          // Autenticación fallida, maneja el error o muestra un mensaje al usuario
        }
      });
      
    }
    else{
      this.loginForm.markAllAsTouched();
      alert("Datos incorrectos");
    }
  }
  // Aquí puedes utilizar globalService.login() para hacer la solicitud HTTP
  // onLoginClick() {
    // const correo = (document.getElementById('email') as HTMLInputElement).value;; // Obtén el correo del usuario desde tu formulario
    // const password = (document.getElementById('password') as HTMLInputElement).value;; // Obtén la contraseña del usuario desde tu formulario
  
    // // Llama al método login de GlobalService
    // this.globalService.login(correo, password).subscribe(response => {
    //   if (response.logeado) {
    //     // Autenticación exitosa, redirige a la página de inicio (home)
        
    //     this.router.navigate(['/']); // Ajusta la ruta de inicio según tu configuración
    //     setLogeado(true);
    //     console.log(this.globalService.getLogeado());
    //   } else {
    //     // Autenticación fallida, maneja el error o muestra un mensaje al usuario
    //   }
  //   });
  // }
}
// function setLogeado(arg0: boolean) {
//   throw new Error('Function not implemented.');
// }

