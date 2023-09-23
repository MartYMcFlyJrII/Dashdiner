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
  logeado: BehaviorSubject<boolean> = this.globalService.logeado;
  
  constructor(private globalService: GlobalService, private router: Router) {}
  ngOnInit(): void {
    
    
  }

  redirect(pagename: string) {
    this.router.navigate(['/' + pagename]);
  }
  
}


