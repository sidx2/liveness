import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CookieService } from '../../../../../services/cookie.service';
import { Router } from '@angular/router';
import { CameraService } from '../../../services/camera.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss'],
})
export class attendanceComponent {
  hasCamera: boolean = false;
  permissionState: PermissionState = 'prompt';

  private subscriptions: Subscription = new Subscription();

  constructor(
    private cookieService: CookieService,
    private router: Router,
    private cameraService: CameraService,
  ) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.cameraService.hasCamera$.subscribe(hasCamera => {
        this.hasCamera = hasCamera;
        if (hasCamera) {
          this.requestCameraPermission();
        }
      })
    );

    this.subscriptions.add(
      this.cameraService.permissionState$.subscribe(state => {
        this.permissionState = state;
        if (state === 'granted') {
          console.log("state granted: ", state);
        }
      })
    );
  }

  requestCameraPermission() {
    this.cameraService.requestCameraPermission()
      .then(stream => {
        console.log('Camera access granted');
      })
      .catch(err => {
        console.error('Camera access denied', err);
      });
  }

  onLogout() {
    if (this.cookieService.clearAll())
      this.router.navigate(["/auth"])
  }
}
