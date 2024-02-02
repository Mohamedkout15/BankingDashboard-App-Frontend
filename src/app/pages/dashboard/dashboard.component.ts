import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from '../../services/Client.service';
import { ClientDataService } from '../../services/clientdata.service';
import { Subscription } from 'rxjs';
import { Client } from '../../Models/Client.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
    client: Client;
    clientId: string;
    private routeSubscription: Subscription;
    selectedDate1: string; // To store the selected date for the 1st visit
    selectedDate2: string;
    editDate1 = false; // Add this property
    editDate2 = false;
    editinput = false;
    n1 = 0;
    n2 = 0;
    n3 = 0;
    n4 = 0;
    n5 = 0;
    n6 = 0;
    n7 = 0;
    n8 = 0;
    n9 = 0;
    n10 = 0;
    n11 = 0;
    n12 = 0;
    n13 = 0;
    n14 = 0;
    n15 = 0;
    n16 = 0;
    n17 = 0;
    n18 = 0;


    constructor(
        private clientService: ClientService,
        private route: ActivatedRoute,
        private clientDataService: ClientDataService
    ) {}

    ngOnInit() {
        this.routeSubscription = this.clientDataService.currentClientId.subscribe((id) => {
            this.clientId = id;
            this.fetchClientData();
        });
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
                this.handleError('Error setting date', error);
            }
        );
    }

    setDatePrvisite(clientId: string, selectedDate: string) {
        this.clientService.setDatePrvisite(clientId, new Date(selectedDate)).subscribe(
            (data: Client) => {
                this.client = data;
            },
            (error) => {
                this.handleError('Error setting date', error);
            }
        );
    }


    executeAttdprv() {
        const clientId = this.clientId;
        const listprv: number[] = [this.n1, this.n4, this.n7, this.n10, this.n13, this.n16];
        console.log(this.client);

        this.clientService.setValprv(clientId, listprv).subscribe(
            () => {
                console.log('Values sent successfully');
            },
            (error) => {
                // Handle error if needed
                console.error('Error sending values', error);
            }
        );
    }
    executeAttdxv() {
        const clientId = this.clientId;
        const listdx: number[] = [this.n2, this.n5, this.n8, this.n11, this.n14, this.n17];
        console.log(this.client);

        this.clientService.setValdxv(clientId, listdx).subscribe(
            () => {
                console.log('Values sent successfully');
            },
            (error) => {
                // Handle error if needed
                console.error('Error sending values', error);
            }
        );
    }
    executeAttprc() {
        const clientId = this.clientId;
        const listprc: number[] = [this.n3, this.n6, this.n9, this.n12, this.n15, this.n18];
        console.log(this.client);

        this.clientService.setValprc(clientId, listprc).subscribe(
            () => {
                console.log('Values sent successfully');
            },
            (error) => {
                // Handle error if needed
                console.error('Error sending values', error);
            }
        );
    }

    private handleError(message: string, error: any) {
        console.error(message, error);
        if (error instanceof HttpErrorResponse) {
            console.error(`Status: ${error.status}, ${error.statusText}`);
        }
    }
    private getRowColorClassByPercentage(promesse: number, kpi: number | null): string {
        if (promesse !== null && kpi !== null) {
            const promessePercentage = promesse / 100;
            if (promessePercentage <= kpi) {
                return 'table-success';
            } else if (promessePercentage > kpi && kpi >= (promessePercentage - 0.1)) {
                return 'table-warning';
            } else {
                return 'table-danger';
            }
        }
        return '';
    }
}
