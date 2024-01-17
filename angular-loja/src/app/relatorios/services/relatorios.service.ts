import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RelatoriosService {

  constructor(private httpClient: HttpClient) { }

  endpoint = environment.baseUrl + 'relatorios';

  gerarRankingPorPeriodo(dataInicio: string, dataFim: string): Observable<any> {
    const params = new HttpParams()
      .set('dataInicio', dataInicio)
      .set('dataFim', dataFim);

    // Utilize o responseType 'arraybuffer' para obter um Blob diretamente
    // return this.httpClient.get(this.endpoint + '/gerarRankingVendasPeriodo', { params, responseType: 'arraybuffer' })
    //   .pipe(map(response => new Blob([response])));
    return this.httpClient.get(this.endpoint + '/gerarRankingVendasPeriodo', { params, responseType: 'blob', observe: 'response' });
  }
}
