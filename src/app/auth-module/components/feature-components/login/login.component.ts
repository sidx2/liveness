import { Component } from '@angular/core';
import { CookieService } from '../../../../services/cookie.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/auth-module/services/auth.service';
import { HttpResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { IAuthState, LoginCredentials } from 'src/app/auth-module/models/auth';
import { loginFailure, loginRequest, loginSuccess } from 'src/app/auth-module/store/auth.actions';
import { Subject, takeUntil } from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm = new FormGroup({
    username: new FormControl(""),
    password: new FormControl(""),
  });

  destroySubject = new Subject<void>();

  constructor(
    private store: Store<{ auth: IAuthState }>,
    private actions$: Actions,
    private router: Router,
    private cookieService: CookieService,
    private toastr: ToastrService,
  ) {
    
    this.actions$.pipe(
      ofType(loginSuccess),
      takeUntil(this.destroySubject)
      
    ).subscribe((res) => {
      console.log("res: ", res);
      this.cookieService.set("token", res["token"], parseInt(res["exp"]));
      this.toastr.success("Welcome back!")
      this.router.navigate(["/"]);
    })

    this.actions$.pipe(
      ofType(loginFailure),
      takeUntil(this.destroySubject)
      
    ).subscribe((res) => {
      this.toastr.error(res.error)
    })
  }
  
  onFormSubmit() {
    // this.cookieService.set("token", "TOKEN", 60 * 60 * 24)
    this.router.navigate(["/"]);
    console.log("value; " ,this.loginForm.value)
    this.store.dispatch(loginRequest({ credentials: this.loginForm.value as LoginCredentials}))
  }
}
