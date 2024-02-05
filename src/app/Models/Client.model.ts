import {DeuxiemeVisite} from './DeuxiemeVisite.model';
import {PremiereVisite} from './PremiereVisite.model';
import {PromesseClient} from './PromesseClient.model';
import {Adresse} from './adresse.model';

export interface Client {
  id: number;
  idClient: string;
  nomEntreprise: string;
  email: string;
  domaine: string;
  adresse: Adresse;
  matriculeFiscale: string;
  numtel: string;
  premiereVisite: PremiereVisite;
  deuxiemeVisite: DeuxiemeVisite;
  promesseClient: PromesseClient;
}
