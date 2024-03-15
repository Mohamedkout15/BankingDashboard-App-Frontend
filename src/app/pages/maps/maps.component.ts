import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ClientService} from '../../services/Client.service';
import {Client} from '../../Models/Client.model';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

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
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private clientService: ClientService) {

  }

  ngOnInit() {
    this.clientService.getAllClients().subscribe((data: Client[]) => {
      this.clients = data;
      this.dataSource = new MatTableDataSource(this.clients);
      this.dataSource.sort = this.sort;
    });
  }
}
