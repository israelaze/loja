import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RelatoriosService {

  constructor(private httpClient: HttpClient) { }

  endpoint = environment.baseUrl + 'relatorios';

  gerarRankingPorPeriodo(filtro: any): Observable<any> {
    // const params = new HttpParams()
    //   .set('dataInicio', dataInicio)
    //   .set('dataFim', dataFim);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.httpClient.get(this.endpoint + '/gerarRankingVendasPeriodo',
      { params: filtro, headers: headers, responseType: 'blob' as 'json' });
  }
}
