import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatGridListModule} from '@angular/material/grid-list';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FaceLivenessComponent } from './attendance-kiosk-module/attendance-module/components/feature-components/face-liveness/face-liveness.component';
// import { FaceLivenessReactWrapperComponent } from 'src/FaceLivenessReactWrapperComponent';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BarcodeScannerLivestreamModule } from "ngx-barcode-scanner";

import { ToastrModule } from 'ngx-toastr'
import { NgSelectModule } from '@ng-select/ng-select';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    // FaceLivenessComponent,
    // FaceLivenessReactWrapperComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BarcodeScannerLivestreamModule,
    // MatGridListModule,
    // AmplifyAuthenticatorModule,
    // MatIconModule,
    NgSelectModule,
    
    
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    StoreModule.forRoot([]),
    EffectsModule.forRoot(),
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    
  ],
  
  bootstrap: [AppComponent],

  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: ErrorInterceptor,
    //   multi: true
    // }
  ],
})
export class AppModule { }
