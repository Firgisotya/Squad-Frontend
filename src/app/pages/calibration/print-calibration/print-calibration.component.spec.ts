import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintCalibrationComponent } from './print-calibration.component';

describe('PrintCalibrationComponent', () => {
  let component: PrintCalibrationComponent;
  let fixture: ComponentFixture<PrintCalibrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrintCalibrationComponent]
    });
    fixture = TestBed.createComponent(PrintCalibrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
