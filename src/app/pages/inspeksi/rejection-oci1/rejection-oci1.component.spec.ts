import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectionOCI1Component } from './rejection-oci1.component';

describe('RejectionOCI1Component', () => {
  let component: RejectionOCI1Component;
  let fixture: ComponentFixture<RejectionOCI1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RejectionOCI1Component]
    });
    fixture = TestBed.createComponent(RejectionOCI1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
