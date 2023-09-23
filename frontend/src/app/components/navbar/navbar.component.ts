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
  logeado: boolean = this.globalService.logeado;
  
  constructor(private globalService: GlobalService, private router: Router) {}
  ngOnInit(): void {
    
    
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


