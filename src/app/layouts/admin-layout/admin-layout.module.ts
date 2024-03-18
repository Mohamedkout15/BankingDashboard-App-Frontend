import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClipboardModule } from 'ngx-clipboard';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { InterfaceVisiteComponent } from '../../pages/InterfaceVisite/InterfaceVisite.component';
import { AjouterClientComponent } from '../../pages/ajouterclient/ajouterclient.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatInputModule} from '@angular/material/input';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from "@angular/material/dialog";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AdminLayoutRoutes),
        FormsModule,
        HttpClientModule,
        NgbModule,
        ClipboardModule,
        ReactiveFormsModule,
        MatInputModule,
        DragDropModule,
        InterfaceVisiteComponent,
        MatTableModule,
        MatSortModule,
        MatIconModule,
        MatButtonModule,
        MatDialogModule


    ],
  declarations: [
      UserProfileComponent,
    TablesComponent,
    AjouterClientComponent,
    MapsComponent
  ]
})

export class AdminLayoutModule {}
