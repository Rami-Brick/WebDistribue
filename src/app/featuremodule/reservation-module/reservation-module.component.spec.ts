import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationModuleComponent } from '../../../../../../../../../../Documents/DEV-CAPFEST/DEV-CAPFEST/CapFestT/Front_CapFest/src/app/featuremodule/reservation-module/reservation-module.component';

describe('ReservationModuleComponent', () => {
  let component: ReservationModuleComponent;
  let fixture: ComponentFixture<ReservationModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservationModuleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
