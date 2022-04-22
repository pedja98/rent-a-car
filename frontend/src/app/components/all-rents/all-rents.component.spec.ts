import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllRentsComponent } from './all-rents.component';

describe('AllRentsComponent', () => {
  let component: AllRentsComponent;
  let fixture: ComponentFixture<AllRentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllRentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllRentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
