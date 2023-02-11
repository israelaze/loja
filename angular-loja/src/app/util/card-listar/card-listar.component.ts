import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-listar',
  templateUrl: './card-listar.component.html',
  styleUrls: ['./card-listar.component.scss']
})
export class CardListarComponent {

  //Parâmetros passados ao chamar o card-listar
  @Input() tituloFormulario: string;

  constructor() { }

}
