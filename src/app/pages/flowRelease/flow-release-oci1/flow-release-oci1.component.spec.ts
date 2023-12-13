import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowReleaseOCI1Component } from './flow-release-oci1.component';

describe('FlowReleaseOCI1Component', () => {
  let component: FlowReleaseOCI1Component;
  let fixture: ComponentFixture<FlowReleaseOCI1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FlowReleaseOCI1Component]
    });
    fixture = TestBed.createComponent(FlowReleaseOCI1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
