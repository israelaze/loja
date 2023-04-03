import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  constructor(private httpCliente: HttpClient) { }

  endpoint = environment.baseUrl + 'categorias';

  //BUSCAR CATEGORIAS
  buscarCategorias(){
    return this.httpCliente.get(this.endpoint);
  }

}
