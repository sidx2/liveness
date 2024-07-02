import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CameraService {
  hasCameraSubject = new BehaviorSubject<boolean>(false);
  hasCamera$ = this.hasCameraSubject.asObservable();

  permissionStateSubject = new Subject<PermissionState>();
  permissionState$ = this.permissionStateSubject.asObservable();

  constructor(private ngZone: NgZone) {
    this.checkCameraAvailability();
    this.monitorPermissionChanges();
  }

  checkCameraAvailability() {
    navigator.mediaDevices.enumerateDevices()
      .then(devices => {
        const hasCamera = devices.some(device => device.kind === 'videoinput');
        this.ngZone.run(() => this.hasCameraSubject.next(hasCamera));
      })
      .catch(error => {
        console.error('Error checking camera availability:', error);
        this.ngZone.run(() => this.hasCameraSubject.next(false));
      });
  }

  async requestCameraPermission(): Promise<MediaStream> {
    return navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        this.ngZone.run(() => this.permissionStateSubject.next('granted'));
        return stream;
      })
      .catch(err => {
        this.ngZone.run(() => this.permissionStateSubject.next('denied'));
        throw err;
      });
  }

  monitorPermissionChanges() {
    navigator.permissions.query({ name: 'camera' as any }).then(permissionStatus => {
      // Initial permission status
      this.ngZone.run(() => this.permissionStateSubject.next(permissionStatus.state));

      // Listen for permission changes
      permissionStatus.onchange = () => {
        this.ngZone.run(() => this.permissionStateSubject.next(permissionStatus.state));
      };
    }).catch(error => {
      console.error('Error querying camera permission:', error);
      this.ngZone.run(() => this.permissionStateSubject.next('denied'));
    });
  }
}
