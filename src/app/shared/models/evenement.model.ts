export interface Event {
    id?: number;
    nom: string;
    description: string;
    dateDebut: Date;
    dateFin: Date;
    lieu: string;
    nombreParticipants: number;
    organisateur: string;
    prix: number;
  }