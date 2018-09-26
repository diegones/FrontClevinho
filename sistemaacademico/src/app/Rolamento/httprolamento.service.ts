import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Rolamento } from './rolamento.component'
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

@Injectable()
export class HttpRolamentoService {
  constructor(private _http: Http) { }

  public getRolamentos(): Observable<Rolamento[]> {
    return this._http.
      get('http://diegobiba.jelasticlw.com.br/rest/rolamentorest').pipe(
        map(this.extractData)
      );      
  }

  private extractData(res: Response) {
    return res.json();
  }

  addRolamento(rolamento: Rolamento): Observable<string> {
    const json = JSON.stringify(rolamento);
    //{"id":"1","nome":"abc"}
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this._http.
      post('http://diegobiba.jelasticlw.com.br/rest/rolamentorest',
      json, options).pipe(map(res => res.json()))
  }

  updateRolamento(rolamento: Rolamento): Observable<any> {
    const json = JSON.stringify(rolamento);
    //{"id":"1","nome":"abc"}
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this._http.
      put('http://diegobiba.jelasticlw.com.br/rest/rolamentorest',
      json, options).pipe(map((res : Response) => {
        res.json()
        console.log('resposta: ', res.json())
        })
      )
  }

  deleteRolamento(rolamento: Rolamento): Observable<string> {
    //const json = JSON.stringify(rolamento);
    //{"id":"1","nome":"abc"}
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this._http.
      delete('http://diegobiba.jelasticlw.com.br/'+
      '/rest/rolamentorest/'+rolamento.id,
      options).pipe(map(res => res.json()))
  }

  addEndereco(rolamento: Rolamento): Observable<string> {
    const json = JSON.stringify(rolamento);
    //{"id":"1","nome":"abc"}
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this._http.
      post('http://diegobiba.jelasticlw.com.br/rest/enderecorest',
      json, options).pipe(map(res => res.json()))
  }


}
