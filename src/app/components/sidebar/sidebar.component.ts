import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/interfacevisite', title: 'Interface Visite Client',  icon: 'attach_money', class: '' },
    { path: '/listeclients', title: 'Liste Clients',  icon:'format_list_bulleted', class: '' },
    { path: '/ajouterclient', title: 'Ajouter Client',  icon:'person_add', class: '' },
    { path: '/user-profile', title: 'User profile',  icon:'', class: '' },
    { path: '/tables', title: 'Tables',  icon:'', class: '' },
    { path: '/login', title: 'Login',  icon:'', class: '' },
    { path: '/register', title: 'Register',  icon:'', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
}
