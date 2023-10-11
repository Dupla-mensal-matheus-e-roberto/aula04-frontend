import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Carro } from '../models/carro';

@Injectable({
  providedIn: 'root'
})
export class CarroService {

  API: string = 'http://localhost:8080/api/carro';
  http = inject(HttpClient);

  constructor() { }

  listAll(): Observable<Carro[]> {
    return this.http.get<Carro[]>(this.API);
  }

  save(carro: Carro): Observable<Carro> {
    return this.http.post<Carro>(this.API, carro);
  }

  update(carro: Carro) : Observable<Carro> {
    return this.http.put<Carro>(`${this.API}/${carro.id}`, carro);
  }

  delete(id: number) : Observable<Carro> {
    return this.http.delete<Carro>(`${this.API}/${id}`);
  }

  exemploErro(): Observable<Carro[]> {
    return this.http.get<Carro[]>(this.API + '/erro');
  }

  verify(carro: Carro){
    if(carro.id){
      return this.update(carro);
    } else {
      return this.save(carro);
    }
  }

}
