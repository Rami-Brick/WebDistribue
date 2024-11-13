import {Component, OnInit} from '@angular/core';
import {Reservation} from "../../service/reservation-module/Reservation";
import {ReservationService} from "../../service/reservation-module/reservation.service";
import { routes } from 'src/app/core/helpers/routes/routes';
import {mylistings} from "../../shared/models/my-listings.model";
import { DataService } from 'src/app/service/data.service';
import {Router} from "@angular/router";
import {jsPDF} from "jspdf";

@Component({
  selector: 'app-reservation-module',
  templateUrl: './reservation-module.component.html',
  styleUrls: ['./reservation-module.component.scss']
})
export class ReservationModuleComponent implements OnInit {
  public routes = routes;

  reservations: Reservation[] = [];
  errorMessage = '';
  res: any[] = [];

  constructor(    private router: Router,
                  private reservationService: ReservationService,) {

  }

  ngOnInit(): void {
    this.fetchReservations();
    this.fetchRes();
  }


  private fetchReservations(): void {
    this.reservationService.getAllReservations().subscribe(
      (data: Reservation[]) => {
        this.reservations = data;
      },
      error => {
        console.error('Error fetching reservations:', error);
      }
    );
  }

  fetchReservationById(id: string): void {
    this.reservationService.getReservationById(id).subscribe( res => {
      this.reservations = [res];
    }, error => {
      this.errorMessage = error;
    });
  }

  fetchRes(): void {
    this.reservationService.getAllDiscussions().then(discussionsObservable => {
      discussionsObservable.subscribe(discussions => {
        this.res = discussions;
        console.log("discussions   : " + this.res);
      }, error => {
        this.errorMessage = error;
      });
    });
  }


  //add button to reserve the space
  reservationDetails(resId: any): void {
    this.router.navigate([routes.reservationDetails , resId]);
  }


}
