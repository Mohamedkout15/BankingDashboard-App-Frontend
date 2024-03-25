import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { Client } from '../Models/Client.model';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private baseUrl = 'http://localhost:8081/client';
  private clientsSubject = new BehaviorSubject<Client[]>([]);
  clients$: Observable<Client[]> = this.clientsSubject.asObservable();

  constructor(private http: HttpClient) {
  }
  updateClients(clients: Client[]) {
    this.clientsSubject.next(clients);
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

  checkClientId(clientId: string) {
    const url = `${this.baseUrl}/checkid/${clientId}`;
    return this.http.get<boolean>(url);
  }
  getAllClients(): Observable <Array<Client>> {
    const url = `${this.baseUrl}/findall`;
    return this.http.get<Array<Client>>(url);
  }
  deleteClientByIdClient(clientId: string) {
    const url = `${this.baseUrl}/delete/${clientId}`;
    return this.http.delete<Client>(url);
  }
  updateClientByIdClient(clientId: string, updatedClient: Client): Observable<Client> {
    const url = `${this.baseUrl}/update/${clientId}`;
    return this.http.patch<Client>(url, updatedClient);
  }
}
