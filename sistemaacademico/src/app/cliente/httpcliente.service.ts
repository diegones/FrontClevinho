import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { Cliente } from '../modelos/cliente.models';



@Injectable()
export class HttpClienteService {
  constructor(private _http: Http) { }

  public getClientes(): Observable<Cliente[]> {
    return this._http.
      get('http://diegobiba.jelasticlw.com.br/rest/clienterest').pipe(
        map(this.extractData)
      );      
  }

  private extractData(res: Response) {
    return res.json();
  }

  addCliente(cliente: Cliente): Observable<string> {
    const json = JSON.stringify(cliente);
    
    console.log('usuario a ser cadastrado: ', json)

    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this._http.
      post('http://diegobiba.jelasticlw.com.br/rest/clienterest',
      json, options).pipe(map(res => res.json()))
  }

  updateCliente(cliente: Cliente): Observable<any> {
    const json = JSON.stringify(cliente);
    //{"id":"1","nome":"abc"}
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this._http.
      put('http://diegobiba.jelasticlw.com.br/rest/clienterest',
      json, options).pipe(map((res : Response) => {
        res.json()
        console.log('resposta: ', res.json())
        })
      )
  }

  deleteCliente(cliente: Cliente): Observable<string> {
    //const json = JSON.stringify(cliente);
    //{"id":"1","nome":"abc"}
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this._http.
      delete('http://diegobiba.jelasticlw.com.br/'+
      '/rest/clienterest/'+cliente.id,
      options).pipe(map(res => res.json()))
  }

  addEndereco(cliente: Cliente): Observable<string> {
    const json = JSON.stringify(cliente);
    //{"id":"1","nome":"abc"}
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this._http.
      post('http://diegobiba.jelasticlw.com.br/rest/enderecorest',
      json, options).pipe(map(res => res.json()))
  }


}
