import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RelatoriosService {

  constructor(private httpClient: HttpClient) { }

  endpoint = environment.baseUrl + 'relatorios';

  gerarRankingPorPeriodo(filtro: any): Observable<any> {
    const params = new HttpParams().set('filtro', JSON.stringify(filtro));

    const headers = new HttpHeaders({
      //'Content-Type': 'application/json',
    //  'Accept': 'application/json'
    });

    return this.httpClient.get<string>(this.endpoint + '/gerarRankingVendasPeriodo',
      {
        params: params,
        responseType: 'text' as 'json'

      });
  }

   //BUSCAR TIPOS DE RELATÓRIO
   buscarTiposRelatorio(){
    return this.httpClient.get(this.endpoint + '/tiposRelatorio');
  }
}
