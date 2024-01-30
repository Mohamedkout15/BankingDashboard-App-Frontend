import {DeuxiemeVisite} from './DeuxiemeVisite.model';
import {PremiereVisite} from './PremiereVisite.model';
import {PromesseClient} from './PromesseClient.model';

export interface Client {
  id: number;
  idClient: string;
  nomEntreprise: string;
  email: string;
  domaine: string;
  adresse: string;
  matriculeFiscale: string;
  numtel: string;
  deuxiemeVisite: DeuxiemeVisite;
  premiereVisite: PremiereVisite;
  promesseClient: PromesseClient;
}
