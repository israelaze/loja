import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit{

  anoAtual: any;

  constructor() { }

  ngOnInit(): void {

  //Fornece o ano atual
  const dataAtual = new Date();
  const anoAtual = dataAtual.getFullYear();
  this.anoAtual = anoAtual;
 // console.log(anoAtual);

  }

}
