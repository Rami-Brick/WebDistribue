import { Disponibilite } from './disponibilite';
import { CategorieEspace } from './CategorieEspace';

export interface Espaces {
  id?: number;
  nom: string;
  description: string;
  adresse: string;
  latitude: number;
  longitude: number;
  capacite: number;
  tarif: number;
  disponibilite: boolean;
  photos: string[];
  categorie?: CategorieEspace;
  disponibilites?: Disponibilite[];
}
