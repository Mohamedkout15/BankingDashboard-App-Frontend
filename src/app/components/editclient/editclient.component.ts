import { Component, Inject, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Client } from "../../Models/Client.model";
import { ClientService } from "../../services/Client.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
    selector: 'app-edit-client-dialog',
    templateUrl: './editclient.component.html',
    standalone: true,
    imports: [
        ReactiveFormsModule
    ],
    styleUrls: ['./editclient.component.css']
})
export class EditClient implements OnInit {
    editForm: FormGroup;
    client: Client;

    constructor(
        private fb: FormBuilder,
        private clientService: ClientService,
        public dialogRef: MatDialogRef<EditClient>,
        @Inject(MAT_DIALOG_DATA) public data: Client
    ) { }

    ngOnInit() {
        this.client = this.data;
        this.initForm();
    }

    initForm() {
        this.editForm = this.fb.group({
            nomEntreprise: [this.client.nomEntreprise, Validators.required],
            email: [this.client.email, [Validators.required, Validators.email]],
            domaine: [this.client.domaine],
            matriculeFiscale: [this.client.matriculeFiscale, Validators.pattern(/^\d{3}[A-Z]{2}\d{4}$/)],
            numtel: [this.client.numtel, Validators.pattern(/^\d{8}$/)],
            codepostal: [this.client.adresse.codepostal, Validators.required],
            adresse: [this.client.adresse.adresse, Validators.required],
            ville: [this.client.adresse.ville, Validators.required],
            gouvernerat: [this.client.adresse.gouvernerat, Validators.required],
            pays: ['Tunisia']
        });
    }

    onSubmit() {
        if (this.editForm.valid) {
            const updatedClient: Client = {
                id: 0,
                idClient: this.client.idClient,
                adresse: {
                    id: 0,
                    ville: this.editForm.value.ville,
                    adresse: this.editForm.value.adresse,
                    gouvernerat: this.editForm.value.gouvernerat,
                    codepostal: this.editForm.value.codepostal,
                    pays: this.editForm.value.pays,
                },
                premiereVisite: this.client.premiereVisite || null,
                deuxiemeVisite: this.client.deuxiemeVisite || null,
                promesseClient: this.client.promesseClient || null,
                domaine:this.editForm.value.domaine,
                email:this.editForm.value.email,
                matriculeFiscale:this.editForm.value.matriculeFiscale,
                numtel:this.editForm.value.numtel,
                nomEntreprise:this.editForm.value.nomEntreprise// Handle undefined values
            };
            this.clientService.updateClientByIdClient(this.client.idClient, updatedClient).subscribe({
                next: () => {
                    console.log("Updated Client (After Update):", updatedClient);
                    this.dialogRef.close(updatedClient);
                },
                error: (error: HttpErrorResponse) => {
                    if (error.status === 400) {
                        console.error('Bad Request Error:', error.error);
                    } else {
                        console.error('An unexpected error occurred:', error);
                    }
                }
            });
        }
    }


    onCancelClick(): void {
        this.dialogRef.close();
    }
}
