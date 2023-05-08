import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Fornecedor } from '../models/fornecedor';
import { FornecedorPost } from '../models/fornecedorPost';

@Injectable({
  providedIn: 'root'
})
export class FornecedoresService {

  // URL API WEB
 endpoint = environment.baseUrl + 'fornecedores';

 // INJEÇÃO DE DEPENDÊNCIA
 constructor(private httpClient: HttpClient) { }

  // BUSCAR TODOS
  buscarTodos() {
   return this.httpClient.get<Fornecedor[]>(this.endpoint);
  }

  // CADASTRAR
  cadastrar(fornecedor: FornecedorPost) {
    return this.httpClient.post<Fornecedor>(this.endpoint, fornecedor);
  }

  // BUSCAR ID
  buscarId(idFornecedor: number) {
    return this.httpClient.get<Fornecedor>(`${this.endpoint}/${idFornecedor}`);
  }

  // ATUALIZAR
  atualizar(fornecedor: Fornecedor) {
    return this.httpClient.put<Fornecedor>(this.endpoint, fornecedor);
  }

  //EXCLUIR
  excluir(idFornecedor: number) {
    return this.httpClient.delete(this.endpoint + '/' + idFornecedor, { responseType: 'text' });
  }

}
