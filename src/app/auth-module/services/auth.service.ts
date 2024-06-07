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
    return this.http.post("http://172.16.108.38/kioskLogin/login", { user: credentials.username, password: credentials.password })
    
  }
}
