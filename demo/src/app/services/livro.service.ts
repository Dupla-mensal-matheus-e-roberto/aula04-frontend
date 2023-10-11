import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Livro } from '../models/livro';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  API: string = 'http://localhost:8080/api/livro';
  http = inject(HttpClient);

  constructor() { }

  listAll(): Observable<Livro[]> {
    return this.http.get<Livro[]>(this.API);
  }

  save(livro: Livro): Observable<Livro> {
    livro.id=100000
    return this.http.post<Livro>(this.API, livro);
  }

  update(livro: Livro) : Observable<Livro> {
    return this.http.put<Livro>(`${this.API}/${livro.id}`, livro);
  }

  delete(id: number) : Observable<Livro> {
    return this.http.delete<Livro>(`${this.API}/${id}`);
  }

  exemploErro(): Observable<Livro[]> {
    return this.http.get<Livro[]>(this.API + '/erro');
  }

  verify(livro: Livro){
    if(livro.id){
      return this.update(livro);
    } else {
      return this.save(livro);
    }
  }
}
