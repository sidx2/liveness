import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { attendanceKioskComponent } from './components/attendance-kiosk/attendance-kiosk.component';
import { attendanceKioskRoutingModule } from './attendance-kiosk-routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../interceptors/auth.interceptor';
import { ErrorInterceptor } from '../interceptors/error.interceptor';

@NgModule({
  declarations: [
    attendanceKioskComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    attendanceKioskRoutingModule,
  ],
  
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    
  ],

})
export class attendanceKioskModule { }
