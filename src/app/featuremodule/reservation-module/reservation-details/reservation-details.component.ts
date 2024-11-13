import { Component, OnInit } from '@angular/core';
import { Lightbox } from 'ngx-lightbox';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationService } from 'src/app/service/reservation-module/reservation.service';
import { Reservation } from 'src/app/service/reservation-module/Reservation';
import { routes } from 'src/app/core/helpers/routes/routes';

@Component({
  selector: 'app-reservation-details',
  templateUrl: './reservation-details.component.html',
  styleUrls: ['./reservation-details.component.scss']
})
export class ReservationDetailsComponent implements OnInit {
  public routes = routes;
  public albumsOne: any = [];
  public albumsTwo: any = [];
  public reservation: any;

  idRes: any;
  constructor(
    private reservationService: ReservationService,
    private _lightbox: Lightbox,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    for (let i = 5; i <= 12; i++) {
      const src = 'assets/img/gallery/gallery1/gallery-' + i + '.jpg';
      this.albumsOne.push({ src: src });
      this.albumsTwo.push({ src: src });
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idRes = params['id'];
      this.fetchReservationDetails();
    });
  }

  open(index: number, albumArray: Array<any>): void {
    this._lightbox.open(albumArray, index);
  }

  openAll(albumArray: Array<any>): void {
    this._lightbox.open(albumArray);
  }

  close(): void {
    this._lightbox.close();
  }

  direction() {
    this.router.navigate([routes.servicedetails]);
  }

  fetchReservationDetails(): void {
    this.reservationService.getReservationById(this.idRes).subscribe(
      (data: Reservation) => {
        this.reservation = data;
      },
      error => {
        console.error('Error fetching reservations:', error);
      }
    );
  }
}
