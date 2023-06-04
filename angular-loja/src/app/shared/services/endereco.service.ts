import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Endereco } from '../models/endereco';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

  // URL API WEB
  endpoint = environment.baseUrl + 'cep';
  constructor(private httpCliente: HttpClient) { }

  buscarEnderecoAPI(cep: String){
    return this.httpCliente.get<Endereco>(this.endpoint + '/' + cep)
  }
}
