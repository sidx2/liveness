import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'src/app/services/cookie.service';

@Component({
  selector: 'app-attendance-kiosk',
  templateUrl: './attendance-kiosk.component.html',
  styleUrls: ['./attendance-kiosk.component.scss']
})
export class attendanceKioskComponent {
onMenuDataLoaded(arg0: any) {
throw new Error('Method not implemented.');
}

  dropdownOpen = false;
  userEmail: string = "Email not found";
  userEmailInitials: string = "!?"
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

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  onProfile() {
    throw new Error('Method not implemented.');
  }
  onSettings() {
    throw new Error('Method not implemented.');
  }

  onLogout() {
    this.cookieService.clearAll();
    this.router.navigate(["/auth"])
  }

  @HostListener('document:click', ['$event'])
  handleClick(event: Event) {
    const target = event.target as HTMLElement;
    const clickedInside = target.closest('.user-avatar');

    if (!clickedInside) {
      this.dropdownOpen = false;
    }
  }
}
