import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const logoutGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  let token;

  const cookieString = document.cookie;
  const cookies = cookieString.split('; ');

  for (let cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split('=');
    if (cookieName === "token") {
      token = cookieValue;
    }
  }

  console.log("inside logout guard: ", token);

  if (token) {
    router.navigate(['/']);
    return false;
  } else {
    return true;
  }
};
