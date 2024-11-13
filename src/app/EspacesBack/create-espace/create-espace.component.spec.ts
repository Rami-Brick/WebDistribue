import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEspaceComponent } from './create-espace.component';

describe('CreateEspaceComponent', () => {
  let component: CreateEspaceComponent;
  let fixture: ComponentFixture<CreateEspaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEspaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
