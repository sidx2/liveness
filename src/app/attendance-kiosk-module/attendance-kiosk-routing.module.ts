import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { attendanceKioskComponent } from './components/attendance-kiosk/attendance-kiosk.component';
import { authGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: attendanceKioskComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'attendance',
        loadChildren: () => import("./attendance-module/attendance.module").then(m => m.attendanceModule),
      },
      {
        path: '',
        redirectTo: 'attendance',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'settings',
    loadChildren: () => import("./kiosk-settings-module/kiosk-settings.module").then(m => m.KioskSettingsModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class attendanceKioskRoutingModule { }
