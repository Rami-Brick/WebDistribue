import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEspacesComponent } from './list-espaces.component';

describe('ListEspacesComponent', () => {
  let component: ListEspacesComponent;
  let fixture: ComponentFixture<ListEspacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListEspacesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListEspacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
