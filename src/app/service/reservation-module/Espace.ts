export interface Espace {
  id: string | null;
  nom: string;
  description: string;
  adresse: string;
  latitude: number;
  longitude: number;
  capacite: number;
  tarif: number;
  disponibilite: boolean;
  photos: string[];
}
