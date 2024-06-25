import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { attendanceKioskComponent } from './components/attendance-kiosk/attendance-kiosk.component';
import { attendanceKioskRoutingModule } from './attendance-kiosk-routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../interceptors/auth.interceptor';

@NgModule({
  declarations: [
    attendanceKioskComponent
  ],
  imports: [
    RouterModule,
    attendanceKioskRoutingModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
})
export class attendanceKioskModule { }
