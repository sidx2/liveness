import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'src/app/services/cookie.service';

@Component({
  selector: 'app-attendance-kiosk',
  templateUrl: './attendance-kiosk.component.html',
  styleUrls: ['./attendance-kiosk.component.scss']
})
export class attendanceKioskComponent {
  constructor(
    private cookieService: CookieService,
    private router: Router,
  ) { }
  onLogout() {
    this.cookieService.clearAll();
    this.router.navigate(["/auth"])
  }
}
