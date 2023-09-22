import { Component } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service'; // Ajusta la ruta adecuada
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  constructor(private globalService: GlobalService, private router: Router) {}

  // Aquí puedes utilizar globalService.login() para hacer la solicitud HTTP
  onLoginClick() {
    const correo = (document.getElementById('email') as HTMLInputElement).value;; // Obtén el correo del usuario desde tu formulario
    const password = (document.getElementById('password') as HTMLInputElement).value;; // Obtén la contraseña del usuario desde tu formulario
  
    // Llama al método login de GlobalService
    this.globalService.login(correo, password).subscribe(response => {
      if (response.logeado) {
        // Autenticación exitosa, redirige a la página de inicio (home)
        this.router.navigate(['/']); // Ajusta la ruta de inicio según tu configuración
      } else {
        // Autenticación fallida, maneja el error o muestra un mensaje al usuario
      }
    });
  }
}
