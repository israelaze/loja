import { ClientePut } from './../models/cliente-put';
import { ClientePost } from './../models/cliente-post';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Cliente } from '../models/cliente';
import { delay, first, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  // URL API WEB
  endpoint = environment.baseUrl + 'clientes';

  // INJEÇÃO DE DEPENDÊNCIA
  constructor(private httpClient: HttpClient) { }

  //  // BUSCAR TODOS
  //  buscarTodos() {
  //   return this.httpClient.get<Cliente[]>(this.endpoint);
  // }

  buscarTodos() {
    return this.httpClient.get<Cliente[]>(this.endpoint)
      .pipe(
        first()
      );
  }

  // CADASTRAR
  cadastrar(cliente: ClientePost) {
    console.log(cliente);

    return this.httpClient.post<Cliente>(this.endpoint, cliente);
  }

  // BUSCAR ID
  buscarId(idCliente: number) {
    return this.httpClient.get<Cliente>(this.endpoint + '/' + idCliente);
  }

  // ATUALIZAR
  atualizar(cliente: ClientePut) {
    console.log(cliente);

    return this.httpClient.put<Cliente>(this.endpoint, cliente);
  }

  //EXCLUIR
  excluir(idCliente: number) {
    return this.httpClient.delete(this.endpoint + '/' + idCliente, {responseType: 'text'});
  }

}
