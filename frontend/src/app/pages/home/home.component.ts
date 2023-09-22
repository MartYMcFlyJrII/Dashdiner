import { Component } from '@angular/core';
import { Restaurante } from 'src/app/models/restaurante';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  restaurantes: Restaurante[] = [];
  constructor(private service: GlobalService) {}

  ngOnInit() {
    this.loadItems();
  }
  loadItems() {
    this.service
      .getAllRestaurantes()
      .subscribe((result: Restaurante[]) => (this.restaurantes = result));
  }
}
