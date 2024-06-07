import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KioskSettingsComponent } from './components/feature-components/kiosk-settings/kiosk-settings.component';
import { KioskSettingsRoutingModule } from './kiosk-settings-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { kioskSettingsReducer } from "./store/kiosk-settings.reducers";
import { kioskSettingsEffects } from "./store/kiosk-settings.effects";
import { NgSelectComponent, NgSelectModule } from '@ng-select/ng-select';
import { AssignmentsComponent } from './components/feature-components/assignments/assignments.component';

@NgModule({
  declarations: [
    KioskSettingsComponent,
    AssignmentsComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    KioskSettingsRoutingModule,
    NgSelectModule,

    StoreModule.forFeature("kioskSettings", kioskSettingsReducer),
    EffectsModule.forFeature([kioskSettingsEffects])
  ]
})
export class KioskSettingsModule { }
