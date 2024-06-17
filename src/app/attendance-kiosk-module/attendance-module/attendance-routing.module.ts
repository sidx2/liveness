import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { attendanceComponent } from "./components/feature-components/attendance/attendance.component";
import { FaceLivenessComponent } from "./components/feature-components/face-liveness/face-liveness.component";
import { QrComponent } from "./components/feature-components/qr/qr.component";

const routes: Routes = [
    { path: "", component: attendanceComponent}, 
    { path: "liveness", component: FaceLivenessComponent },
    { path: "qr", component: QrComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AttendeceRoutingModule { }