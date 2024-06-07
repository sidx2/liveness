import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  set(name: string, value: string, seconds: number): void {
    if (!isPlatformBrowser(this.platformId)) { return; }
    const date = new Date();
    date.setTime(date.getTime() + (seconds * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = `${name}=${value};${expires};path=/`;
  }  

  get(name: string): string | null {
    if (!isPlatformBrowser(this.platformId)) { return null; }
    const cookieString = document.cookie;
    const cookies = cookieString.split('; ');

    for (let cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split('=');
      if (cookieName === name) {
        return cookieValue;
      }
    }

    return null;
  }

  remove(name: string): boolean {
    if (!isPlatformBrowser(this.platformId)) { return false; }
    if (this.get(name)) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      return true;
    }
    return false;
  }
  
  clearAll(): boolean {
    if (!isPlatformBrowser(this.platformId)) { return false; }
    const cookies = document.cookie.split('; ');
    for (let cookie of cookies) {
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
    return true;
  }
}
