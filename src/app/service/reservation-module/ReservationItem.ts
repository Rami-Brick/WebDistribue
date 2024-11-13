export interface ReservationItem {
  id: string | null;
  nom: string | null;
  description: string | null;
  dateDebut: string;
  dateFin: string;
  quantite: number;
  prixUnitaire: number;
  sousTotal: number;
}
