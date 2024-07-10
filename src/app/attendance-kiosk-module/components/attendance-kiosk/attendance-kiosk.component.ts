import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'src/app/services/cookie.service';

@Component({
  selector: 'app-attendance-kiosk',
  templateUrl: './attendance-kiosk.component.html',
  styleUrls: ['./attendance-kiosk.component.scss']
})
export class attendanceKioskComponent {
  userEmail: string = "Email not found";
  userEmailInitials: string = "!?"
  dropdownOpen = false;
  
  constructor(
    private cookieService: CookieService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    const user_email = this.cookieService.get("user_email");
    if (user_email) {

      this.userEmail = user_email;
      this.userEmailInitials = ("" + user_email[0] + user_email[1]).toUpperCase();
    }
  }

  onLogout() {
    this.cookieService.clearAll();
    this.router.navigate(["/auth"])
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }
}
