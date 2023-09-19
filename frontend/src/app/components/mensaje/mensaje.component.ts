import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-mensaje',
  templateUrl: './mensaje.component.html',
  styleUrls: ['./mensaje.component.css'],
})
export class MensajeComponent {
  @Input() contenido!: string;
  @Input() tipo!: string;
  @Output() visible = new EventEmitter<boolean>();
}
