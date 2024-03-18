import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ClientService } from '../../services/Client.service';
import { Client } from '../../Models/Client.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import Swal from "sweetalert2";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from "ngx-toastr";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { EditClient } from "../../components/editclient/editclient.component";

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MapsComponent implements OnInit {
  clients: Client[] = [];
  displayedColumns: string[] = ['name', 'idClient', 'location', 'domaine', 'actions'];
  dataSource: MatTableDataSource<Client>;
  editForm: FormGroup;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
      private fb: FormBuilder,
      private clientService: ClientService,
      private toastr: ToastrService,
      private dialog: MatDialog // Inject the MatDialog service
  ) { }

  ngOnInit() {
    this.editForm = this.fb.group({
      nomEntreprise: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      domaine: [''],
      matriculeFiscale: [''],
      numtel: [''],
      codepostal: [''],
      adresse: [''],
      ville: [''],
      gouvernorat: [''],
      pays: ['Tunisia']
    });
    this.fetchClients();
  }

  fetchClients() {
    this.clientService.getAllClients().subscribe((data: Client[]) => {
      this.clients = data;
      this.dataSource = new MatTableDataSource(this.clients);
      this.dataSource.sort = this.sort;
    });
  }

  deleteClient(clientId: string) {
    const clientToDelete = this.dataSource.data.find(client => client.idClient === clientId);
    const message = `
    <div class="message">
      <p>ID Client: ${clientToDelete.idClient}</p>
      <p>Nom Entreprise: ${clientToDelete.nomEntreprise}</p>
      <p>Email: ${clientToDelete.email}</p>
      <p>Domaine: ${clientToDelete.domaine}</p>
      <p>Matricule Fiscale: ${clientToDelete.matriculeFiscale}</p>
      <p>Numero Telephone: ${clientToDelete.numtel}</p>
      <p>Adresse: ${clientToDelete.adresse.codepostal},${clientToDelete.adresse.adresse},${clientToDelete.adresse.ville},${clientToDelete.adresse.gouvernerat}</p>
    </div>`;

    Swal.fire({
      title: 'Vous êtes sûr de supprimer ce client ?',
      html: `${message}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Annuler',
      confirmButtonText: 'Supprimer'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clientService.deleteClientByIdClient(clientId).subscribe(() => {
          this.fetchClients();
          Swal.fire('Supprimé!', 'Votre client a été supprimé.', 'success');
          this.toastr.error('Client supprimé avec succès', 'Deleted', {
            timeOut: 5000,
            positionClass: 'toast-bottom-left'
          });
        }, error => {
          Swal.fire('Error!', 'Une erreur s\'est produite lors de la suppression du client.', 'error');
        });
      }
    });
  }

  openEditDialog(client: Client): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = client;
    dialogConfig.width = '1000px';
    dialogConfig.position = {
      top: '50%',
      left: '50%',
    };

    const dialogRef = this.dialog.open(EditClient, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.fetchClients();
      }
    });
  }


}
