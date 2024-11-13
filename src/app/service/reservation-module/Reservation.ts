import {User} from "./User";
import {ReservationItem} from "./ReservationItem";
import {Espace} from "./Espace";


/*export interface Reservation {
  id: string;
  dateCreation: string;
  user: User;
  items: ReservationItem[];
  espace: Espace;
  montantTotal: number;
  statut: string;
}*/
export interface Reservation {
  id: string;
  dateCreation: string;
  user: User;
  items: ReservationItem[];
  espace: Espace;
  montantTotal: number;
  statut: string;
  eventName: string;
  eventDate: Date;
  eventTime: string;
  numberOfGuests: number;
  decorationPack: string;
  additionalNotes?: string;
  organization?: string;
}
