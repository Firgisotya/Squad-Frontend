import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportCalibrationComponent } from './report-calibration.component';

describe('ReportCalibrationComponent', () => {
  let component: ReportCalibrationComponent;
  let fixture: ComponentFixture<ReportCalibrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportCalibrationComponent]
    });
    fixture = TestBed.createComponent(ReportCalibrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
