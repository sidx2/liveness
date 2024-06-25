import { Component } from '@angular/core';
import { CookieService } from '../../../../services/cookie.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IAuthState, LoginCredentials } from 'src/app/auth-module/models/auth';
import { loginFailure, loginRequest, loginSuccess } from 'src/app/auth-module/store/auth.actions';
import { Subject, take, takeUntil } from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';

// const a = {
//   "status": 1,
//   "message": 
//   "Successfull", 
//   "review_data": { "token": "402d8834352f8f8dcfa12d54f584a789", 
//   "logo": "https:\/\/darwinbox-data-qa-mum.s3.ap-south-1.amazonaws.com\/QA_5a841e4e988e2_14\/logo\/5eff18834a5fa__tenant-avatar-14_1094962792.jpg", 
//   "company_name": "Bob", 
//   "user_id": "a666ad8c795e04" }
// }

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
      takeUntil(this.destroySubject),
      take(1),
      
    ).subscribe((res) => {
      if (res.status === 1) {

        console.log("res: ", res);

        this.cookieService.set("token", res.review_data.token, parseInt(res.exp) || 60 * 60 * 24);
        this.cookieService.set("user_id", res.review_data.user_id, parseInt(res.exp) || 60 * 60 * 24);
        const welcomeText = `Welcome back! ${res?.review_data?.company_name}`;
        // this.toastr.success(welcomeText)
        (window as any).toast.show(welcomeText, "info");
        this.router.navigate(["/"]);
      }
    })

    this.actions$.pipe(
      ofType(loginFailure),
      takeUntil(this.destroySubject)

    ).subscribe((res) => {
      (window as any).toast.show(res.error || "Something went wrong", "error");
    })
  }

 

  onFormSubmit() {
    // this.cookieService.set("token", "TOKEN", 60 * 60 * 24)
    this.router.navigate(["/"]);
    console.log("value; ", this.loginForm.value)
    this.store.dispatch(loginRequest({ credentials: this.loginForm.value as LoginCredentials }))
  }
}
