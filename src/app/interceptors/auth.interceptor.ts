import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CookieService } from '../services/cookie.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router, private cookieService: CookieService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log("inside intercept", request);
    
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if ((!request.url.includes("auth")) && error.status === 401) {
          console.log("inside intercept 401")

          this.cookieService.clearAll();
          this.router.navigate(['/auth']);
          (window as any).toast.show("Session was expired. You need to login again.");
        }
        return throwError(error);
      })
    );
  }
}
