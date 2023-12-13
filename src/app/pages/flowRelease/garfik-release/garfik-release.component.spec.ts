import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GarfikReleaseComponent } from './garfik-release.component';

describe('GarfikReleaseComponent', () => {
  let component: GarfikReleaseComponent;
  let fixture: ComponentFixture<GarfikReleaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GarfikReleaseComponent]
    });
    fixture = TestBed.createComponent(GarfikReleaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
