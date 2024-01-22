import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    // const params = new HttpParams()
    //   .set('dataInicio', dataInicio)
    //   .set('dataFim', dataFim);

    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    // });


    const formData: FormData = new FormData();
    formData.append('filtro', JSON.stringify(filtro));


    return this.httpClient.post(this.endpoint + '/gerarRankingVendasPeriodo', formData,
      { responseType: 'blob' as 'json' });
  }
}
