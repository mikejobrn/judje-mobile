import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BuscaService {

  constructor(private httpClient: HttpClient) { }

  buscaSimples(termo: string, uf: string) {
    const encodedParam = encodeURI(termo);
    return this.httpClient.get(
      `${environment.urlApi}/busca/${encodedParam}?uf=${uf}`,
      { responseType: 'blob' }
    );
  }
}
