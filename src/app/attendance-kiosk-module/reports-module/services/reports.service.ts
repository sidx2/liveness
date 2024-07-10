import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'src/app/services/cookie.service';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) { }

  getTableData() {
    return this.http.post("http://172.16.108.38/liveLog/getLogs", {admin: this.cookieService.get("user_email")});
  }
}
