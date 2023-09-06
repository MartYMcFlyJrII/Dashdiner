import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css'],
})
export class BuscarComponent {
  texto: string = '';
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    var param = this.route.snapshot.paramMap.get('texto');
    this.texto = typeof param == 'string' ? param : '';
  }
}
