import {Client} from './Client.model';

export interface PromesseClient {
  id: number;
  chiffreAffaire: number;
  placements: number;
  engagements: number;
  impayes: number;
  debit: number;
  depot: number;
}
