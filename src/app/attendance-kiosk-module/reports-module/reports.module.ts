import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from './components/feature-components/reports/reports.component';
import { ReportsRoutingModule } from "./reports-routing.module";
import { MagnifierDirective } from './directives/magnifier.directive'
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    ReportsComponent,
    MagnifierDirective,
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    MatIconModule,

  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    
  ],
})
export class ReportsModule { }
