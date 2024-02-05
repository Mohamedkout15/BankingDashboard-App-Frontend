import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ClientService} from '../../services/Client.service';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss']
})
export class IconsComponent implements OnInit {

  clientForm: FormGroup;

  constructor(private fb: FormBuilder, private clientService: ClientService) {
    this.clientForm = this.fb.group({
      idClient: ['', Validators.required],
      nomEntreprise: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      domaine: ['', Validators.required],
      matriculeFiscale: ['', Validators.required],
      numtel: ['', Validators.required],
      codepostal: ['', Validators.required],
      adresse: ['', Validators.required],
      ville: ['', Validators.required],
      gouvernerat: ['', Validators.required],
      pays: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.clientForm.valid) {
      const newClient = this.clientForm.value;
      this.clientService.addClient(newClient).subscribe(
          (response) => {
            console.log('Client added successfully', response);
            // Reset the form after successful submission
            this.clientForm.reset();
          },
          (error) => {
            console.error('Error adding client', error);
          }
      );
    }
  }


  ngOnInit() {
  }
}
