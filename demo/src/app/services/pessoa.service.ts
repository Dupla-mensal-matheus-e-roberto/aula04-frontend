import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pessoa } from '../models/pessoa';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  API: string = 'http://localhost:8080/api/pessoa';
  http = inject(HttpClient);

  constructor() { }


  listAll(): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(this.API);
  }

  save(pessoa: Pessoa) : Observable<Pessoa> {
    return this.http.post<Pessoa>(this.API, pessoa);
  }

  update(pessoa: Pessoa) : Observable<Pessoa> {
    return this.http.put<Pessoa>(`${this.API}/${pessoa.id}`, pessoa);
  }

  delete(id: number) : Observable<Pessoa> {
    return this.http.delete<Pessoa>(`${this.API}/${id}`);
  }

  exemploErro(): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(this.API + '/erro');
  }

  verify(pessoa: Pessoa){
    if (pessoa.id) {
      return this.update(pessoa);
    } else {
      return this.save(pessoa);
    }
  }

}
