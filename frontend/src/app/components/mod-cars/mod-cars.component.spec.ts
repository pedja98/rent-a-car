import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModCarsComponent } from './mod-cars.component';

describe('ModCarsComponent', () => {
  let component: ModCarsComponent;
  let fixture: ComponentFixture<ModCarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModCarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
