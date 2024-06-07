import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/feature-components/login/login.component';
import { AuthWrapperComponent } from './components/feature-components/auth-wrapper/auth-wrapper.component';
import { AuthRoutingModule } from './auth-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { authEffects } from './store/auth.effects';
import { authReducer } from './store/auth.reducers';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LoginComponent,
    AuthWrapperComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,

    ReactiveFormsModule,
    StoreModule.forFeature("auth", authReducer),
    EffectsModule.forFeature([authEffects])
  ]
})
export class AuthModule { }
