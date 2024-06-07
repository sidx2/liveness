import { ComponentFixture, TestBed } from '@angular/core/testing';

import { attendanceKioskComponent } from './attendance-kiosk.component';

describe('attendanceKioskComponent', () => {
  let component: attendanceKioskComponent;
  let fixture: ComponentFixture<attendanceKioskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [attendanceKioskComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(attendanceKioskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
