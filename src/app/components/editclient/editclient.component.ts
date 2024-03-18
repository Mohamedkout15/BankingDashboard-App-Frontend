import { Component, Inject, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Client } from "../../Models/Client.model";
import { ClientService } from "../../services/Client.service";
import {MatFormFieldModule} from "@angular/material/form-field";

@Component({
    selector: 'app-edit-client-dialog',
    templateUrl: './editclient.component.html',
    standalone: true,
    imports: [
        MatFormFieldModule,
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
            gouvernorat: [this.client.adresse.gouvernerat, Validators.required],
            pays: ['Tunisia']
        });
    }

    onSubmit() {
        if (this.editForm.valid) {
            const updatedClient: Client = {
                idClient: this.client.idClient,
                ...this.editForm.value
            };
            this.clientService.updateClientByIdClient(this.client.idClient, updatedClient).subscribe(() => {
                this.dialogRef.close(updatedClient);
            });
        }
    }

    onCancelClick(): void {
        this.dialogRef.close();
    }
}
