import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalibrationComponent } from './calibration.component';

describe('CalibrationComponent', () => {
  let component: CalibrationComponent;
  let fixture: ComponentFixture<CalibrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalibrationComponent]
    });
    fixture = TestBed.createComponent(CalibrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
