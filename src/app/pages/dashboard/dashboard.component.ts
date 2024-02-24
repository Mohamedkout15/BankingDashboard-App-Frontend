import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from '../../services/Client.service';
import { ClientDataService } from '../../services/clientdata.service';
import { Subscription } from 'rxjs';
import { Client } from '../../Models/Client.model';
import { HttpErrorResponse } from '@angular/common/http';
import * as XLSX from 'xlsx';

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
    n1 = null;
    n2 = null;
    n3 = null;
    n4 = null;
    n5 = null;
    n6 = null;
    n7 = null;
    n8 = null;
    n9 = null;
    n10 = null;
    n11 = null;
    n12 = null;
    n13 = null;
    n14 = null;
    n15 = null;
    n16 = null;
    n17 = null;
    n18 = null;


    constructor(
        private clientService: ClientService,
        private route: ActivatedRoute,
        private clientDataService: ClientDataService
    ) {}

    ngOnInit() {
        this.routeSubscription = this.clientDataService.currentClientId.subscribe((id) => {
            this.clientId = id;
            this.fetchClientData();
            this.initvalues();
            console.log([this.n1, this.n2, this.n3]);
        });
        this.initvalues();

    }
    ngOnDestroy() {
        this.routeSubscription.unsubscribe();
        this.initvalues();
    }
    initvalues() {
        if (this.client && this.client.premiereVisite && this.client.premiereVisite.placements !== null) {
            this.n1 = this.client.premiereVisite.placements;
        }
        if (this.client && this.client.promesseClient && this.client.promesseClient.placements !== null) {
            this.n2 = this.client.promesseClient.placements;
        }
        if (this.client && this.client.deuxiemeVisite && this.client.deuxiemeVisite.placements !== null) {
            this.n3 = this.client.deuxiemeVisite.placements;
        }
        if (this.client && this.client.premiereVisite && this.client.premiereVisite.chiffreAffaire !== null) {
            this.n4 = this.client.premiereVisite.chiffreAffaire;
        }
        if (this.client && this.client.promesseClient && this.client.promesseClient.chiffreAffaire !== null) {
            this.n5 = this.client.promesseClient.chiffreAffaire;
        }
        if (this.client && this.client.promesseClient && this.client.promesseClient.chiffreAffaire !== null) {
            this.n6 = this.client.deuxiemeVisite.chiffreAffaire;
        }
        if (this.client && this.client.premiereVisite && this.client.premiereVisite.impayes !== null) {
            this.n7 = this.client.premiereVisite.impayes;
        }
        if (this.client && this.client.promesseClient && this.client.promesseClient.impayes !== null) {
            this.n8 = this.client.promesseClient.impayes;
        }
        if (this.client && this.client.deuxiemeVisite && this.client.deuxiemeVisite.impayes !== null) {
            this.n9 = this.client.deuxiemeVisite.impayes;
        }
        if (this.client && this.client.premiereVisite && this.client.premiereVisite.engagements !== null) {
            this.n10 = this.client.premiereVisite.engagements;
        }
        if (this.client && this.client.promesseClient && this.client.promesseClient.engagements !== null) {
            this.n11 = this.client.promesseClient.engagements;
        }
        if (this.client && this.client.deuxiemeVisite && this.client.deuxiemeVisite.engagements !== null) {
            this.n12 = this.client.deuxiemeVisite.engagements;
        }
        if (this.client && this.client.premiereVisite && this.client.premiereVisite.debit !== null) {
            this.n13 = this.client.deuxiemeVisite.engagements;
        }
        if (this.client && this.client.promesseClient && this.client.promesseClient.debit !== null) {
            this.n14 = this.client.promesseClient.debit;
        }
        if (this.client && this.client.deuxiemeVisite && this.client.deuxiemeVisite.debit !== null) {
            this.n15 = this.client.deuxiemeVisite.debit;
        }
        if (this.client && this.client.premiereVisite && this.client.premiereVisite.depot !== null) {
            this.n16 = this.client.premiereVisite.depot;
        }
        if (this.client && this.client.promesseClient && this.client.promesseClient.depot !== null) {
            this.n17 = this.client.promesseClient.depot;
        }
        if (this.client && this.client.deuxiemeVisite && this.client.deuxiemeVisite.depot !== null) {
            this.n18 = this.client.deuxiemeVisite.depot;
        }    }
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
    getRowColorClassByPercentage(promesse: number, kpi: number | null): string {
        if (promesse !== null && kpi !== null) {
            const prkpi: Number   = kpi / 100;
            const promessePercentage = promesse / 100;
            if (promessePercentage <= prkpi) {
                return 'table-success';
            } else if (promessePercentage > prkpi && prkpi >= (promessePercentage - 0.1)) {
                return 'table-warning';
            } else {
                return 'table-danger';
            }
        }
        return '';
    }

    generateExcelFile(client: Client): void {
        // Flatten the nested structure of the client object
        const flattenedClient = this.flattenObject(client);

        // Create a worksheet
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet([flattenedClient]);

        // Create a workbook with the worksheet
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Client Data');

        // Save the workbook to an Excel file
        const fileName = 'client_data.xlsx';
        XLSX.writeFile(wb, fileName);
    }
    flattenObject(obj: any): any {
        const result = {};

        function recurse(current: any, prop: string | number): void {
            if (current instanceof Object) {
                for (const p in current) {
                    if (current.hasOwnProperty(p)) {
                        recurse(current[p], prop + '.' + p);
                    }
                }
            } else {
                result[prop] = current;
            }
        }

        for (const prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                recurse(obj[prop], prop);
            }
        }

        return result;
    }


}
