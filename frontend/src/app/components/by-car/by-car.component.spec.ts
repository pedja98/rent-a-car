import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ByCarComponent } from './by-car.component';

describe('ByCarComponent', () => {
  let component: ByCarComponent;
  let fixture: ComponentFixture<ByCarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ByCarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ByCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
