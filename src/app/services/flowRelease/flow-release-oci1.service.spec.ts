import { TestBed } from '@angular/core/testing';

import { FlowReleaseOCI1Service } from './flow-release-oci1.service';

describe('FlowReleaseOCI1Service', () => {
  let service: FlowReleaseOCI1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlowReleaseOCI1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
