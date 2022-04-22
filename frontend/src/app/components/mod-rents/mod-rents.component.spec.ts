import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModRentsComponent } from './mod-rents.component';

describe('ModRentsComponent', () => {
  let component: ModRentsComponent;
  let fixture: ComponentFixture<ModRentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModRentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModRentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
