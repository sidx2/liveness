import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/feature-components/login/login.component';
import { AuthWrapperComponent } from './components/feature-components/auth-wrapper/auth-wrapper.component';

const routes: Routes = [
  {
    path: '',
    component: AuthWrapperComponent,

    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
    //   {
    //     path: 'signup',
    //     component: SignupComponent,
    //   },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
