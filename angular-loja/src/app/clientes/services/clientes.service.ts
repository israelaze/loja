import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Cliente } from '../models/cliente';
import { ClientePost } from './../models/cliente-post';
import { ClientePut } from './../models/cliente-put';


@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  // URL API WEB
  endpoint = environment.baseUrl + 'clientes';

  // INJEÇÃO DE DEPENDÊNCIA
  constructor(private httpClient: HttpClient) { }

   // BUSCAR TODOS
   buscarTodos() {
    return this.httpClient.get<Cliente[]>(this.endpoint);
  }

  // CADASTRAR
  cadastrar(dados: string, file: File) {

    const formData: FormData = new FormData();

    formData.append('file', file);
    formData.append('dadosCliente', dados)

    return this.httpClient.post<Cliente>(this.endpoint, formData);
  }

  // BUSCAR ID
  buscarId(idCliente: number) {
    return this.httpClient.get<Cliente>(this.endpoint + '/' + idCliente);
  }

  // ATUALIZAR
  atualizar(dados: string, file: File) {
    const formData: FormData = new FormData();

    formData.append('file', file);
    formData.append('dadosCliente', dados)

    return this.httpClient.put<Cliente>(this.endpoint, formData);
  }

  //EXCLUIR
  excluir(idCliente: number) {
    return this.httpClient.delete(this.endpoint + '/' + idCliente, {responseType: 'text'});
  }

}
