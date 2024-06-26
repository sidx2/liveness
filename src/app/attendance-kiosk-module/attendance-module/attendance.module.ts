import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { attendanceComponent } from './components/feature-components/attendance/attendance.component';
import { AttendeceRoutingModule } from './attendance-routing.module';
import { FaceLivenessComponent } from './components/feature-components/face-liveness/face-liveness.component';
import { FaceLivenessReactWrapperComponent } from './components/feature-components/FaceLivenessReactWrapperComponent';
import { MatGridListModule } from '@angular/material/grid-list';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import { MatIconModule } from '@angular/material/icon';
import { QrscannerComponent } from './components/feature-components/qrscanner/qrscanner.component';
import { BarcodeScannerLivestreamModule } from "ngx-barcode-scanner";
import { QrComponent } from './components/feature-components/qr/qr.component';

@NgModule({
  declarations: [
    attendanceComponent,
    FaceLivenessComponent,
    FaceLivenessReactWrapperComponent,
    QrscannerComponent,
    QrComponent,
  ],
  imports: [
    CommonModule,
    BarcodeScannerLivestreamModule,
    MatGridListModule,
    AmplifyAuthenticatorModule,
    MatIconModule,
    AttendeceRoutingModule,
  ],

  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class attendanceModule { }
