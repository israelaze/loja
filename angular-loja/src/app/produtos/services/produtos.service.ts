import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Produto } from '../models/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  // URL API WEB
  endpoint = environment.baseUrl + 'produtos';

  // INJEÇÃO DE DEPENDÊNCIA
  constructor(private httpClient: HttpClient) { }

  // BUSCAR TODOS
  buscarTodos() {
    return this.httpClient.get<Produto[]>(this.endpoint);
  }

  // CADASTRAR
  cadastrar(dados: string, file: File) {

    const formData: FormData = new FormData();

    formData.append('file', file);
    formData.append('dadosProduto', dados)

    return this.httpClient.post<Produto>(this.endpoint, formData);
  }

  // BUSCAR ID
  buscarId(idProduto: number) {
    return this.httpClient.get<Produto>(this.endpoint + '/' + idProduto);
  }

  // ATUALIZAR
  atualizar(dados: string, file: File) {
    const formData: FormData = new FormData();

    formData.append('file', file);
    formData.append('dadosProduto', dados)

    return this.httpClient.put<Produto>(this.endpoint, formData);
  }

  //EXCLUIR
  excluir(idProduto: number) {
    return this.httpClient.delete(this.endpoint + '/' + idProduto, {responseType: 'text'});
  }

}
