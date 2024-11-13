import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ReservationService} from "../../../service/reservation-module/reservation.service";

@Component({
  selector: 'app-confirm-reservation',
  template: '<p>Confirming reservation...</p>',
  styleUrls: ['./confirm-reservation.component.scss']
})
export class ConfirmReservationComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reservationService: ReservationService
  ) { }

  ngOnInit(): void {
    const reservationId = this.route.snapshot.queryParamMap.get('reservationId');
    if (reservationId) {
      this.reservationService.confirmReservation(reservationId).subscribe(
        () => {
          this.router.navigate(['/Reservation']);
        },
        error => {
          console.error('Error confirming reservation', error);
        }
      );
    }
  }
}
