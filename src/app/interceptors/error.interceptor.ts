import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Injectable } from "@angular/core";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log("inside error interceptor!")
    return next.handle(request).pipe(
      catchError((errorResponse: HttpErrorResponse) => {
        if (errorResponse instanceof HttpErrorResponse) {
          let errorMessage = '';

          switch (errorResponse.status) {
            case 0:
              errorMessage = 'Backend is offline. Please try again later.';
              break;
              
            case 401:
              errorMessage = 'Unauthorized';
              break;

            case 403:
              errorMessage = 'Forbidden';
              break;

            case 500:
              errorMessage = 'Internal Server Error';
              break;
              
            default:
              return throwError(errorResponse);
              break;
          }

          console.log("errorMessage:" , errorMessage);
          (window as any).toast(errorMessage, "error");
        }
        return throwError(errorResponse);
      })
    );
  }
}
