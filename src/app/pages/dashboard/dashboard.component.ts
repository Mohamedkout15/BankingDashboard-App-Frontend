import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from '../../services/Client.service';
import { ClientDataService } from '../../services/clientdata.service';
import { Subscription } from 'rxjs';
import { Client } from '../../Models/Client.model';
import {Adresse} from '../../Models/adresse.model';
import {HttpErrorResponse} from '@angular/common/http';
import {PremiereVisite} from '../../Models/PremiereVisite.model';
import {DeuxiemeVisite} from '../../Models/DeuxiemeVisite.model';
import {PromesseClient} from '../../Models/PromesseClient.model';

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
    selectedDate2: string;
    editDate1 = false; // Add this property
    editDate2 = false;
    premierevisite : PremiereVisite;
    deuxiemevisite : DeuxiemeVisite;
    promesseclient : PromesseClient;
    constructor(
        private clientService: ClientService,
        private route: ActivatedRoute,
        private clientDataService: ClientDataService
    ) {
    }

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
                if (error instanceof HttpErrorResponse) {
                    console.error(`Status: ${error.status}, ${error.statusText}`);
                }
            }
        );
    }

    setDatePrvisite(clientId: string, selectedDate: string) {
        this.clientService.setDatePrvisite(this.clientId, new Date(selectedDate)).subscribe(
            (data: Client) => {
                // Update the client data if needed
                this.client = data;
            },
            (error) => {
                console.error('Error setting date', error);
                if (error instanceof HttpErrorResponse) {
                    console.error(`Status: ${error.status}, ${error.statusText}`);
                }
            }
        );
    }
}
