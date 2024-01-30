// shared/client-data.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientDataService {
  private clientIdSource = new BehaviorSubject<string>('');
  currentClientId = this.clientIdSource.asObservable();

  updateClientId(id: string) {
    this.clientIdSource.next(id);
  }
}
