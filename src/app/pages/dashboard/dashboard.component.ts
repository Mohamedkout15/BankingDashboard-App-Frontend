import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from '../../services/Client.service';
import { ClientDataService } from '../../services/clientdata.service';
import { Subscription } from 'rxjs';
import { Client } from '../../Models/Client.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  client: Client;
  private clientId: string;
  private routeSubscription: Subscription;

  constructor(
    private clientService: ClientService,
    private route: ActivatedRoute,
    private clientDataService: ClientDataService
  ) {}

  ngOnInit() {
    this.routeSubscription = this.clientDataService.currentClientId.subscribe(
      (id) => {
        this.clientId = id;
        this.fetchClientData();
      }
    );
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

  fetchClientData() {
    this.clientService.getClientData(this.clientId).subscribe(
      (data: Client) => {
        this.client = data;
        console.log(this.client);
      },
      (error) => {
        console.error('Error fetching client data', error);
      }
    );
  }
}
