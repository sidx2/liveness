import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';
import { CookieService } from 'src/app/services/cookie.service';

@Injectable({
  providedIn: 'root'
})
export class QrService {

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) {

  }

  markAttendenceUsingQR(data: any) {
    console.log("data:", data);
    try {

      return this.http.post("http://172.16.108.38/attendance/QrAttendance", {
        "qrData": JSON.parse(data),
        "token": this.cookieService.get("token")
      })
    } catch (err) {
      throwError(err);
    }

    return throwError("Something went wrong while marking attendance using QR")
  }
}
