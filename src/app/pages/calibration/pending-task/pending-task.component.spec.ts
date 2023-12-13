import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingTaskComponent } from './pending-task.component';

describe('PendingTaskComponent', () => {
  let component: PendingTaskComponent;
  let fixture: ComponentFixture<PendingTaskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PendingTaskComponent]
    });
    fixture = TestBed.createComponent(PendingTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
