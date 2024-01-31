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
  setValprv(id: string, nValues: Number[]): Observable<Client> {
    const url = `${this.baseUrl}/setvalprv/${id}`;
    const params = new HttpParams()
        .set('n1', nValues[0].toString())
        .set('n2', nValues[1].toString())
        .set('n3', nValues[2].toString())
        .set('n4', nValues[3].toString())
        .set('n5', nValues[4].toString())
        .set('n6', nValues[5].toString());

    return this.http.post<Client>(url, null, { params });
  }

  setValdxv(id: string, nValues: Number[]): Observable<Client> {
    const url = `${this.baseUrl}/setvaldxv/${id}`;
    const params = new HttpParams()
        .set('n1', nValues[0].toString())
        .set('n2', nValues[1].toString())
        .set('n3', nValues[2].toString())
        .set('n4', nValues[3].toString())
        .set('n5', nValues[4].toString())
        .set('n6', nValues[5].toString());

    return this.http.post<Client>(url, null, { params });
  }

  setValprc(id: string, nValues: Number[]): Observable<Client> {
    const url = `${this.baseUrl}/setvalprc/${id}`;
    const params = new HttpParams()
        .set('n1', nValues[0].toString())
        .set('n2', nValues[1].toString())
        .set('n3', nValues[2].toString())
        .set('n4', nValues[3].toString())
        .set('n5', nValues[4].toString())
        .set('n6', nValues[5].toString());

    return this.http.post<Client>(url, null, { params });
  }
}

