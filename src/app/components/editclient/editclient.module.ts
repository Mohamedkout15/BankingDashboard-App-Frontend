import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'; // Import MatInputModule
import { ReactiveFormsModule } from '@angular/forms';
import { EditClient } from './editclient.component'; // Assuming this is the correct path to your component

@NgModule({
    declarations: [],
    imports: [
        MatFormFieldModule,
        MatInputModule, // Include MatInputModule here
        ReactiveFormsModule,
        EditClient
    ],
    exports: [EditClient]
})
export class EditClientModule { }
