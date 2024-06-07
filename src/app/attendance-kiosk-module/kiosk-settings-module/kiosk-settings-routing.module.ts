import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { KioskSettingsComponent } from "./components/feature-components/kiosk-settings/kiosk-settings.component";
import { AssignmentsComponent } from "./components/feature-components/assignments/assignments.component";

const routes: Routes = [
    { path: "", component: KioskSettingsComponent },
    { path: "assignments", component: AssignmentsComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class KioskSettingsRoutingModule { }