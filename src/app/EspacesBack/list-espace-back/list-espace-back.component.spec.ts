import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEspaceBackComponent } from './list-espace-back.component';

describe('ListEspaceBackComponent', () => {
  let component: ListEspaceBackComponent;
  let fixture: ComponentFixture<ListEspaceBackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListEspaceBackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListEspaceBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
