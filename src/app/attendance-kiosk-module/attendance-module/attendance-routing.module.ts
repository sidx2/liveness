import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { attendanceComponent } from "./components/feature-components/attendance/attendance.component";
import { FaceLivenessComponent } from "./components/feature-components/face-liveness/face-liveness.component";
import { QrscannerComponent } from "./components/feature-components/qrscanner/qrscanner.component";
import { Qr2Component } from "./components/feature-components/qr2/qr2.component";

const routes: Routes = [
    { path: "", component: attendanceComponent}, 
    { path: "liveness", component: FaceLivenessComponent },
    { path: "qr", component: Qr2Component },
    { path: "qr2", component: Qr2Component },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AttendeceRoutingModule { }