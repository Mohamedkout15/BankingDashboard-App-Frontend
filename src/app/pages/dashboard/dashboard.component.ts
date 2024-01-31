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
  clientId: string;
  private routeSubscription: Subscription;
  selectedDate1: string; // To store selected date for the 1st visit
  selectedDate2: string; // To store selected date for the 2nd visit

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
    this.clientService.getClientById(this.clientId).subscribe(
        (data: Client) => {
          this.client = data;
          console.log(this.client);
        },
        (error) => {
          console.error('Error fetching client data', error);
        }
    );
  }

  setDatedxvisite(clientId: string, selectedDate: string) {
    this.clientService.setDatedxvisite(clientId, new Date(selectedDate)).subscribe(
        (data: Client) => {
          this.client = data;
        },
        (error) => {
          console.error('Error setting date', error);
        }
    );
  }
    setDatePrvisite(clientId: string, selectedDate: string) {
      this.clientService.setDatePrvisite(clientId, new Date(selectedDate)).subscribe(
          (data: Client) => {
              this.client = data ;
          },
          error => {
              console.error('Error setting date', error);
          }
      );
  }
}
