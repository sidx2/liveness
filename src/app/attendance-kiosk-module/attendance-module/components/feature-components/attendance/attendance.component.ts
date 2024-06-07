import { Component } from '@angular/core';
import { CookieService } from '../../../../../services/cookie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss'],
})
export class attendanceComponent {
  constructor(
    private cookieService: CookieService,
    private router: Router,
  ) {}

  onLogout() {
    this.cookieService.clearAll();
    this.router.navigate(["/auth"])
  }
}
