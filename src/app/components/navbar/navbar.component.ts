// navbar.component.ts
import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ClientDataService } from '../../services/clientdata.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  public searchForm: FormGroup;

  constructor(
    location: Location,
    private element: ElementRef,
    private router: Router,
    private clientDataService: ClientDataService,  // Inject the shared service
    private formBuilder: FormBuilder
  ) {
    this.location = location;
    this.searchForm = this.formBuilder.group({
      value: [''],
    });
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
  }

  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === '#') {
      titlee = titlee.slice(1);
    }

    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    return 'Dashboard';
  }

  handleSearch() {
    const id = this.searchForm.get('value').value;
    this.clientDataService.updateClientId(id);
  }
}
