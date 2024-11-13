import { Espaces } from "./Espaces";

export interface Disponibilite {
    id?: number;
    disponible: boolean;
    dateEntree: Date;
    dateSortie: Date;
    espace?: Espaces;
  }
  