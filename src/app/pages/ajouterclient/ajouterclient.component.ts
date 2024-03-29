import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'; // Remove unnecessary imports
import Swal from 'sweetalert2';
import { ClientService } from '../../services/Client.service';
import { Client } from '../../Models/Client.model';
import { ToastrService } from 'ngx-toastr';



@Component({
    selector: 'app-ajouterclient',
    templateUrl: './ajouterclient.component.html',
    styleUrls: ['./ajouterclient.component.css']
})
export class AjouterClientComponent implements OnInit {

    constructor(private fb: FormBuilder, private clientService: ClientService, private toastr: ToastrService  ) { }

    selectedCityPostalCodes: string[] = [];
    clientForm: FormGroup;

    ngOnInit() {
        this.initForm();
    }

    showSuccess(): void {
        this.toastr.success('Client Ajouté avec succès', 'Success', {
            timeOut: 5000,
            positionClass: 'toast-bottom-left'
        });
    }


    openConfirmationDialog(): void {
        if (this.clientForm.valid) {
            const formData = this.clientForm.value;
            const message = ` <div class="message">
                                        <p>ID Client: ${formData.idClient}</p>
                                            <p>Nom Entreprise: ${formData.nomEntreprise}</p>
                                            <p>Email: ${formData.email}</p>
                                            <p>Domaine: ${formData.domaine}</p>
                                            <p>Matricule Fiscale: ${formData.matriculeFiscale}</p>
                                            <p>Numero Telephone: ${formData.numtel}</p>
                                            <p>Adresse: ${formData.adresse}</p>
                                            <p>Ville: ${formData.ville}</p>
                                            <p>Gouvernorat: ${formData.Governorate}</p>
                                            <p>Postal Code: ${formData.codepostal}</p>
                                            <p>Pays: ${formData.pays}</p> </div>`;

            Swal.fire({
                title: 'Ajouter Client ?',
                html: `Vous êtes sûr d'ajouter ce client ?<br><br>${message}`, // Display client data in the message
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#1b5f01',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ajouter Client',
                cancelButtonText: 'No, cancel!',
                reverseButtons: true,
            }).then((result) => {
                if (result.isConfirmed) {
                    const clientId = this.clientForm.get('idClient').value;
                    this.clientService.checkClientId(clientId).subscribe(
                        (clientExists: boolean) => {
                            if (!clientExists) {
                                this.addClient();
                                this.showSuccess();
                            } else {
                                console.error('Client already exists');
                            }
                        },
                        (error) => {
                            console.error('Error checking client ID', error);
                        }
                    );
                } else if (
                    /* Read more about handling dismissals below */
                    result.dismiss === Swal.DismissReason.cancel
                ) {
                    Swal.fire({
                        title: "Annulé",
                        text: "L'ajout du client est annulé",
                        icon: "error",
                        confirmButtonColor: '#d33',
                    });
                }
            });

        } else {
            console.error('Form is invalid');
        }
    }




    addClient() {
        const newClient: Client = {
            id : 0 ,
            idClient: this.clientForm.get('idClient').value,
            nomEntreprise: this.clientForm.get('nomEntreprise').value,
            email: this.clientForm.get('email').value,
            domaine: this.clientForm.get('domaine').value,
            matriculeFiscale: this.clientForm.get('matriculeFiscale').value,
            numtel: this.clientForm.get('numtel').value,
            adresse: {
                id : 0 ,
                adresse: this.clientForm.get('adresse').value,
                ville: this.clientForm.get('ville').value,
                gouvernerat: this.clientForm.get('Governorate').value,
                codepostal: this.clientForm.get('codepostal').value,
                pays: this.clientForm.get('pays').value
            },
            premiereVisite: null,
            deuxiemeVisite: null,
            promesseClient: null
        };
        this.clientService.addClient(newClient).subscribe(
            (response) => {
                console.log('Client added successfully', response);
                this.clientForm.reset();
            },
            (error) => {
                console.error('Error adding client', error);
            }
        );
    }

    initForm() {
        this.clientForm = this.fb.group({
            idClient: ['', [Validators.required, Validators.pattern(/^\d{3}[A-Z]{3}\d{4}$/)]],
            nomEntreprise: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            domaine: ['', Validators.required],
            matriculeFiscale: ['', [Validators.required, Validators.pattern(/^\d{3}[A-Z]{2}\d{4}$/)]],
            numtel: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
            codepostal: ['', Validators.required],
            adresse: ['', Validators.required],
            ville: ['', Validators.required],
            Governorate: ['', Validators.required],
            pays: ['Tunisia']
        });
    }

    get selectedGovernorateCities(): string[] {
        return this.villes[this.clientForm.get('Governorate').value] || [];
    }

    onCityChange() {
        const SCity = this.clientForm.get('ville').value;
        this.clientForm.get('codepostal').setValue(this.postalCodesOfTunisia[SCity]);
    }

    get PostalCodeValue(): string {
        const SCity = this.clientForm.get('ville').value;
        return this.postalCodesOfTunisia[SCity];
    }

    onGovernorateChange(SGovernorate: string): void {
        this.clientForm.patchValue({ SCity: '' });
        this.selectedCityPostalCodes = []; // Reset postal codes
    }



governorates: string[] = [
        'Ariana',
        'Beja',
        'Ben Arous',
        'Bizerte',
        'Gabes',
        'Gafsa',
        'Jendouba',
        'Kairouan',
        'Kasserine',
        'Kebili',
        'Kef',
        'Mahdia',
        'Manouba',
        'Medenine',
        'Monastir',
        'Nabeul',
        'Sfax',
        'Sidi Bouzid',
        'Siliana',
        'Sousse',
        'Tataouine',
        'Tozeur',
        'Tunis',
        'Zaghouan'
    ];
    villes: { [key: string]: string[] } = {
        'Ariana': ['Ariana', 'Kalâat el-Andalous', 'La Soukra', 'Mnihla'],
        'Beja': ['Béja', 'Testour', 'Nefza', 'Medjez el-Bab'],
        'Ben Arous': ['Ben Arous', 'El Mourouj', 'Hammam Lif', 'Radès'],
        'Bizerte': ['Bizerte', 'Menzel Bourguiba', 'Mateur', 'Ghar El Melh'],
        'Gabes': ['Gabès', 'El Hamma', 'Mareth', 'Metouia'],
        'Gafsa': ['Gafsa', 'Métlaoui', 'El Ksar', 'Redeyef'],
        'Jendouba': ['Jendouba', 'Tabarka', 'Aïn Draham', 'Fernana'],
        'Kairouan': ['Kairouan', 'Sousse', 'Sbikha', 'Hajeb El Ayoun'],
        'Kasserine': ['Kasserine', 'Sbeitla', 'Fériana', 'Foussana'],
        'Kebili': ['Kébili', 'Douz', 'Souk Lahad'],
        'Kef': ['Le Kef', 'Dahmani', 'Jérissa', 'Sakiet Sidi Youssef'],
        'Mahdia': ['Mahdia', 'Bou Merdes', 'Chebba', 'El Jem'],
        'Manouba': ['Manouba', 'Douar Hicher', 'Oued Ellil', 'Tebourba'],
        'Medenine': ['Médenine', 'Ben Gardane', 'Djerba', 'Zarzis'],
        'Monastir': ['Monastir', 'Moknine', 'Sahline', 'Ksibet el-Médiouni'],
        'Nabeul': ['Nabeul', 'Hammamet', 'Dar Chaâbane', 'Menzel Temime'],
        'Sfax': ['Sfax', 'Sakiet Ezzit', 'El Amra', 'Thyna'],
        'Sidi Bouzid': ['Sidi Bouzid', 'Menzel Bouzaiane', 'Regueb', 'Meknassy'],
        'Siliana': ['Siliana', 'Bouarada', 'Gaâfour', 'El Krib'],
        'Sousse': ['Sousse', 'Kantaoui', 'Akouda', 'Hergla'],
        'Tataouine': ['Tataouine', 'Ghomrassen', 'Remada', 'Bir Lahmar'],
        'Tozeur': ['Tozeur', 'Degache', 'Nefta'],
        'Tunis': ['Tunis', 'La Marsa', 'Carthage', 'Sidi Bou Said'],
        'Zaghouan': ['Zaghouan', 'Zriba', 'Nadhour', 'El Fahs']
    };
    postalCodesOfTunisia: { [key: string]: string } = {
        'Ariana': '2080',
        'Kalâat el-Andalous': '2083',
        'La Soukra': '2051',
        'Mnihla': '2082',
        'Béja': '9000',
        'Testour': '9070',
        'Nefza': '9060',
        'Medjez el-Bab': '9070',
        'Ben Arous': '2013',
        'El Mourouj': '2074',
        'Hammam Lif': '2050',
        'Radès': '2040',
        'Bizerte': '7000',
        'Menzel Bourguiba': '7050',
        'Mateur': '7030',
        'Ghar El Melh': '7011',
        'Gabès': '6000',
        'El Hamma': '6029',
        'Mareth': '6010',
        'Metouia': '6070',
        'Gafsa': '2100',
        'Métlaoui': '2120',
        'El Ksar': '2121',
        'Redeyef': '2122',
        'Jendouba': '8100',
        'Tabarka': '8110',
        'Aïn Draham': '8140',
        'Fernana': '8160',
        'Kairouan': '3100',
        'Sbikha': '3151',
        'Hajeb El Ayoun': '3160',
        'Kasserine': '1200',
        'Sbeitla': '1211',
        'Fériana': '1280',
        'Foussana': '1281',
        'Kébili': '4200',
        'Douz': '4260',
        'Souk Lahad': '4211',
        'Le Kef': '7100',
        'Dahmani': '7170',
        'Jérissa': '7180',
        'Sakiet Sidi Youssef': '7111',
        'Mahdia': '5100',
        'Bou Merdes': '5111',
        'Chebba': '5160',
        'El Jem': '5120',
        'Manouba': '2010',
        'Douar Hicher': '2055',
        'Oued Ellil': '2054',
        'Tebourba': '2056',
        'Médenine': '4100',
        'Ben Gardane': '4110',
        'Djerba': '4180',
        'Zarzis': '4170',
        'Monastir': '5000',
        'Moknine': '5040',
        'Sahline': '5051',
        'Ksibet el-Médiouni': '5070',
        'Nabeul': '8000',
        'Hammamet': '8050',
        'Dar Chaâbane': '8071',
        'Menzel Temime': '8030',
        'Sfax': '3000',
        'Sakiet Ezzit': '3040',
        'El Amra': '3013',
        'Thyna': '3020',
        'Sidi Bouzid': '9100',
        'Menzel Bouzaiane': '9140',
        'Regueb': '9170',
        'Meknassy': '9120',
        'Siliana': '6100',
        'Bouarada': '6120',
        'Gaâfour': '6130',
        'El Krib': '6150',
        'Sousse': '4000',
        'Kantaoui': '4089',
        'Akouda': '4080',
        'Hergla': '4051',
        'Tataouine': '3200',
        'Ghomrassen': '3220',
        'Remada': '3250',
        'Bir Lahmar': '3210',
        'Tozeur': '2200',
        'Degache': '2230',
        'Nefta': '2240',
        'Tunis': '1000',
        'La Marsa': '2070',
        'Carthage': '2016',
        'Sidi Bou Said': '2026',
        'Zaghouan': '1100',
        'Zriba': '1170',
        'Nadhour': '1160',
        'El Fahs': '1150'
    };
    }


