import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BpdComponent } from './bpd.component';

describe('BpdComponent', () => {
  let component: BpdComponent;
  let fixture: ComponentFixture<BpdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BpdComponent]
    });
    fixture = TestBed.createComponent(BpdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
