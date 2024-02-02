import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../Models/Client.model';


@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private baseUrl = 'http://localhost:8081/client';

  constructor(private http: HttpClient) {
  }

  getClientById(id: string): Observable<Client> {
    const url = `${this.baseUrl}/findclient/${id}`;
    return this.http.get<Client>(url);
  }

  addClient(client: Client): Observable<Client> {
    const url = `${this.baseUrl}/addclient`;
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<Client>(url, client, {headers});
  }

  setDatedxvisite(id: string, date: Date): Observable<Client> {
    const url = `${this.baseUrl}/setdatedxvisite/${id}`;
    const params = new HttpParams().set('date', date.toISOString().split('T')[0]);
    return this.http.post<Client>(url, null, {params});
  }

  setDatePrvisite(id: string, date: Date): Observable<Client> {
    const url = `${this.baseUrl}/setdateprvisite/${id}`;
    const params = new HttpParams().set('date', date.toISOString().split('T')[0]);
    return this.http.post<Client>(url, null, {params});
  }
  setValprv(id: string, nValues: number[]): Observable<void> {
    const url = `${this.baseUrl}/setvalprv/${id}`;
    return this.http.post<void>(url, nValues);
  }


  setValdxv(id: string, nValues: Number[]): Observable<void> {
    const url = `${this.baseUrl}/setvaldxv/${id}`;
    return this.http.post<void>(url, nValues);
  }

  setValprc(id: string, nValues: Number[]): Observable<void> {
    const url = `${this.baseUrl}/setvalprc/${id}`;
    return this.http.post<void>(url, nValues);
  }
}

