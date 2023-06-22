import { Component, OnInit } from '@angular/core';
import { Auth } from 'src/app/usuarios/models/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  anoAtual: any;
  nomeUsuario: string;

  constructor() { }

  ngOnInit(): void {

  //Fornece a data atual
  const dataAtual = new Date();
  const anoAtual = dataAtual.getFullYear();
  this.anoAtual = anoAtual;

  // capturando usuário autenticado na sessão
  const usuario = JSON.parse(localStorage.getItem('AUTH') as any);
  this.nomeUsuario = usuario.nome;
  }

}


