import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { GlobalService } from 'src/app/services/global.service'; // Ajusta la ruta adecuada

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  logeado: boolean = false;
  
  constructor(private globalService: GlobalService, private router: Router) {}
  ngOnInit(): void {
    const userObjString = sessionStorage.getItem('usuario');
    if (userObjString) {
      const userObj = JSON.parse(userObjString);
      // Establece el estado de autenticación u otras lógicas relacionadas con el usuario
      // por ejemplo, establecer una variable loggedIn en tu servicio de autenticación
      this.globalService.setLogeado(true);
      // También puedes almacenar el objeto del usuario en un servicio para acceder desde otros componentes
      this.globalService.setUsuario(userObj);
      this.logeado= this.globalService.logeado;
    }
    
  }
  logout() {
    // Realiza el proceso de logout aquí, por ejemplo, limpiando la sesión o el token
    // Luego, redirige al usuario a la página de inicio de sesión
    this.globalService.logout();
    

    // Redirige al usuario a la página de inicio de sesión (ajusta la ruta según tu configuración)
    this.router.navigateByUrl('/login');
  }

  redirect(pagename: string) {
    this.router.navigate(['/' + pagename]);
  }
  
}


