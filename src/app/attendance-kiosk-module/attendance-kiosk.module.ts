import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { attendanceKioskComponent } from './components/attendance-kiosk/attendance-kiosk.component';
import { attendanceKioskRoutingModule } from './attendance-kiosk-routing.module';

@NgModule({
  declarations: [
    attendanceKioskComponent
  ],
  imports: [
    RouterModule,
    attendanceKioskRoutingModule,
  ]
})
export class attendanceKioskModule { }
