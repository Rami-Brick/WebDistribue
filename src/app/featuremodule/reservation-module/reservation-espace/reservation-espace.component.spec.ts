import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationEspaceComponent } from './reservation-espace.component';

describe('ReservationEspaceComponent', () => {
  let component: ReservationEspaceComponent;
  let fixture: ComponentFixture<ReservationEspaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservationEspaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationEspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
