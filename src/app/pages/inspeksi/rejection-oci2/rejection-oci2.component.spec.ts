import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectionOCI2Component } from './rejection-oci2.component';

describe('RejectionOCI2Component', () => {
  let component: RejectionOCI2Component;
  let fixture: ComponentFixture<RejectionOCI2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RejectionOCI2Component]
    });
    fixture = TestBed.createComponent(RejectionOCI2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
