import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ClientService} from '../../services/Client.service';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss']
})
export class IconsComponent implements OnInit {

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
        selectedGovernorate: [''],
        selectedCity: ['']
    });
  }


  clientForm: FormGroup;
    get selectedGovernorateCities(): string[] {
        return this.villes[this.clientForm.get('selectedGovernorate').value] || [];
    }

    onGovernorateChange(selectedGovernorate: string): void {
        this.clientForm.patchValue({ selectedCity: '' });
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
        'Kalaat el-Andalous': '2083',
        'La Soukra': '2051',
        'Mnihla': '2082',
        'Beja': '9000',
        'Testour': '9070',
        'Nefza': '9060',
        'Medjez el-Bab': '9070',
        'Ben Arous': '2013',
        'El Mourouj': '2074',
        'Hammam Lif': '2050',
        'Rades': '2040',
        'Bizerte': '7000',
        'Menzel Bourguiba': '7050',
        'Mateur': '7030',
        'Ghar El Melh': '7011',
        'Gabes': '6000',
        'El Hamma': '6029',
        'Mareth': '6010',
        'Metouia': '6070',
        'Gafsa': '2100',
        'Metlaoui': '2120',
        'El Ksar': '2121',
        'Redeyef': '2122',
        'Jendouba': '8100',
        'Tabarka': '8110',
        'Ain Draham': '8140',
        'Fernana': '8160',
        'Kairouan': '3100',
        'Sbikha': '3151',
        'Hajeb El Ayoun': '3160',
        'Kasserine': '1200',
        'Sbeitla': '1211',
        'Feriana': '1280',
        'Foussana': '1281',
        'Kebili': '4200',
        'Douz': '4260',
        'Souk Lahad': '4211',
        'Le Kef': '7100',
        'Dahmani': '7170',
        'Jerissa': '7180',
        'Sakiet Sidi Youssef': '7111',
        'Mahdia': '5100',
        'Bou Merdes': '5111',
        'Chebba': '5160',
        'El Jem': '5120',
        'Manouba': '2010',
        'Douar Hicher': '2055',
        'Oued Ellil': '2054',
        'Tebourba': '2056',
        'Medenine': '4100',
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
