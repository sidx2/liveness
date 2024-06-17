import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginCredentials } from '../models/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  login(credentials: LoginCredentials) {
    console.log("credentials: ", credentials);
    // const headers = {
    //   "Access-Control-Allow-Origin": "*",
    //   "cookie": "pbqBeYWPUn=T3NZWFFucDg4YVBvd2hQM3FfanZCVVNWXzB-Q1hXX35gXbzLUZnb3csz5Il7JSOaInJSDMb-tTeR26JLjVpVCg%3D%3D; session=57fa85addf0d647e291ed84f1083a85a; ab805d4a680a53f51e16ffb2737d0dc5=2d5b8e6cafdadf8fa7d23f09a705670a070f13cca%3A4%3A%7Bi%3A0%3Bs%3A6%3A%22252825%22%3Bi%3A1%3Bs%3A8%3A%22unyRaWuv%22%3Bi%3A2%3Bi%3A604800%3Bi%3A3%3Ba%3A16%3A%7Bs%3A18%3A%22userSessionTimeout%22%3Bi%3A1718341095%3Bs%3A9%3A%22plan_name%22%3Bs%3A0%3A%22%22%3Bs%3A9%3A%22tenant_id%22%3Bs%3A2%3A%2214%22%3Bs%3A13%3A%22monthly_spend%22%3Bi%3A0%3Bs%3A14%3A%22account_status%22%3Bi%3A2%3Bs%3A7%3A%22is_paid%22%3Bi%3A0%3Bs%3A15%3A%22financial_cycle%22%3Bs%3A1%3A%221%22%3Bs%3A26%3A%22no_of_employees_on_payment%22%3Bi%3A0%3Bs%3A18%3A%22account_created_on%22%3Bi%3A0%3Bs%3A31%3A%22changed_from_trial_to_active_on%22%3Bi%3A0%3Bs%3A12%3A%22mod_is_leave%22%3Bi%3A1%3Bs%3A17%3A%22mod_is_attendance%22%3Bi%3A1%3Bs%3A13%3A%22mod_is_stream%22%3Bi%3A1%3Bs%3A20%3A%22mod_is_reimbursement%22%3Bi%3A1%3Bs%3A14%3A%22mod_is_payroll%22%3Bi%3A1%3Bs%3A9%3A%22expire_on%22%3Bi%3A0%3B%7D%7D"
    // }
    // return this.http.post("http://172.16.108.38/kioskLogin/login", { user: credentials.username, password: credentials.password })
    return this.http.post("/kioskapp/auth", { username: credentials.username, password: credentials.password })
    
  }
}
