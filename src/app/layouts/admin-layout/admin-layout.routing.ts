import { Routes } from '@angular/router';

import { InterfaceVisiteComponent } from '../../pages/InterfaceVisite/InterfaceVisite.component';
import { AjouterClientComponent } from '../../pages/ajouterclient/ajouterclient.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'interfacevisite',      component: InterfaceVisiteComponent },
    { path: 'ajouterclient',          component: AjouterClientComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'listeclients',           component: MapsComponent }
];
