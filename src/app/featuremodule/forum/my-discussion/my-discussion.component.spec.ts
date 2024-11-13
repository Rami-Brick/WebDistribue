import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDiscussionComponent } from './my-discussion.component';

describe('MyDiscussionComponent', () => {
  let component: MyDiscussionComponent;
  let fixture: ComponentFixture<MyDiscussionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyDiscussionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyDiscussionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
