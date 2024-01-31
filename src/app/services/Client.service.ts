import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../Models/Client.model';
import {PromesseClient} from '../Models/PromesseClient.model';
import {PremiereVisite} from '../Models/PremiereVisite.model';
import {DeuxiemeVisite} from '../Models/DeuxiemeVisite.model'; // Adjust the path as needed

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private baseUrl = 'http://localhost:8081/client';

  constructor(private http: HttpClient) {}

  getClientById(id: string): Observable<Client> {
    const url = `${this.baseUrl}/findclient/${id}`;
    return this.http.get<Client>(url);
  }

  addClient(client: Client): Observable<Client> {
    const url = `${this.baseUrl}/addclient`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Client>(url, client, { headers });
  }

  setDatedxvisite(id: string, date: Date): Observable<Client> {
    const url = `${this.baseUrl}/setdatedxvisite/${id}`;
    const params = new HttpParams().set('date', date.toISOString().split('T')[0]);
    return this.http.post<Client>(url, null, { params });
  }
  setDatePrvisite(id: string, date: Date): Observable<Client> {
    const url = `${this.baseUrl}/setdateprvisite/${id}`;
    const params = new HttpParams().set('date', date.toISOString().split('T')[0]);
    return this.http.post<Client>(url, null, { params });
  }

  setDeuxiemeVisite(id: string, deuxiemeVisite: DeuxiemeVisite): Observable<Client> {
    const url = `${this.baseUrl}/setdeuxiemevisite/${id}`;
    const params = new HttpParams().set('deuxiemevisite', JSON.stringify(deuxiemeVisite));
    return this.http.post<Client>(url, null, { params });
  }

  setPremiereVisite(id: string, premiereVisite: PremiereVisite): Observable<Client> {
    const url = `${this.baseUrl}/setpremierevisite/${id}`;
    const params = new HttpParams().set('premierevisite', JSON.stringify(premiereVisite));
    return this.http.post<Client>(url, null, { params });
  }

  setPromesseClient(id: string, promesseClient: PromesseClient): Observable<Client> {
    const url = `${this.baseUrl}/setpromesseclient/${id}`;
    const params = new HttpParams().set('promesseclient', JSON.stringify(promesseClient));
    return this.http.post<Client>(url, null, { params });
  }
}
