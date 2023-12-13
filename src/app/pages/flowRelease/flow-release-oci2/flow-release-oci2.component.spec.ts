import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowReleaseOCI2Component } from './flow-release-oci2.component';

describe('FlowReleaseOCI2Component', () => {
  let component: FlowReleaseOCI2Component;
  let fixture: ComponentFixture<FlowReleaseOCI2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FlowReleaseOCI2Component]
    });
    fixture = TestBed.createComponent(FlowReleaseOCI2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
