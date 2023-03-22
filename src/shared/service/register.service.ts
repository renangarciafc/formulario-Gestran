import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Address } from '../model';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  url:string = 'http://localhost:3000/register';
  urlUpdate: string = 'http://localhost:3000/'

  searchCep(cep: any): Observable<any> {
    return this.httpClient.get(`https://viacep.com.br/ws/${cep}/json/`);
  }

  getRegisters():Observable<Address[]> {
    return this.httpClient.get<Address[]>(this.url);
  }

  addRegisters(registers: Address[]): Observable<Address[]> {
    return this.httpClient.post<Address[]>(this.url, {user: registers});
  }

  updateRegisters(data: any, id: number) {
    return this.httpClient.patch<Address[]>(`${this.url}/${id}`, data);
  }

  deleteRegister(id: number) {
    return this.httpClient.delete<Address[]>(`${this.url}/${id}`);
  }
}
