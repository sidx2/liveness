import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import QrScanner from "qr-scanner"
import { AttendanceService } from '../../../services/attendance.service';
import { Router } from '@angular/router';
import { CookieService } from 'src/app/services/cookie.service';
import { HttpClient } from '@angular/common/http';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { CameraService } from '../../../services/camera.service';

@Component({
  selector: 'app-qr2',
  templateUrl: './qr.component.html',
  styleUrls: ['./qr.component.scss']
})
export class QrComponent implements OnInit, AfterViewInit, OnDestroy {
  hasCamera: boolean = false;
  permissionState: PermissionState = 'prompt';

  private subscriptions: Subscription = new Subscription();

  scanner: any;
  video: any;
  camQrResult: any
  isScannerOn: Boolean = true;
  destroy$ = new Subject<void>();

  beep = new Audio("assets/beep-07a.mp3")

  isModalOpen = false;
  loadingScreenMessage = "";
  subText = "";

  modalHeaderText = "Could not mark attendence! Try again?";
  modalMessage = "Action cannot be undone";
  modalProceedText = "Try again";
  modalCancalText = "Take me back";

  constructor(
    private attendanceService: AttendanceService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private cookieService: CookieService,
    private http: HttpClient,
    private cameraService: CameraService,
  ) {
    const token = this.cookieService.get("token");

    if (token) {
      this.http.post("/kioskapp/syncOfflineClockInAttendance", {
        "requests": [],
        "token": token
      }).pipe(
        takeUntil(this.destroy$)
      ).subscribe((data) => {
        console.log("login verified: ", data);
      })
    }
  }

  toggleScanner() {
    if (!this.hasCamera) {
      (window as any).toast.show("Allow camera access to continue!", "error");
      return;
    }
    console.log("toggling scanner!")
    if (this.isScannerOn) {
      this.scanner.stop();
      this.video.style.display = "none";
      this.loadingScreenMessage = "hit start to start scanning..."

    } else {
      this.scanner.start();
      this.video.style.display = "block";
      // this.videoPlaceholder.style.display = "none";

    }

    this.isScannerOn = !this.isScannerOn;
    this.cdr.detectChanges();
  }

  ngOnInit() {  

    // this.subscriptions.add(
    //   this.cameraService.permissionState$.pipe(
    //     takeUntil(this.destroy$)
    //   ).subscribe((state) => {
    //     this.permissionState = state;
    //     console.log("has camera in init: ", this.hasCamera);

    //     console.log("permissionState: ", state);
    //     if (state === 'granted') {
    //       this.isScannerOn = true;
    //       this.hasCamera = true;
    //       if (this.scanner) this.scanner.start();
    //       if (this.video) this.video.style.display = "block";
    //       this.cdr.detectChanges();

    //     } else if (state === "denied") {
    //       this.loadingScreenMessage = "No Access to camera";
    //       this.subText = "Please allow camera access";
    //       this.cdr.detectChanges();
    //       this.isScannerOn = false;
    //       this.hasCamera = false;
    //       if (this.scanner) this.scanner.stop();
    //       if (this.video) this.video.style.display = "none";
    //       this.cdr.detectChanges();
    //     }
    //   })
    // );

    this.cameraService.checkCameraAvailability();

    this.subscriptions.add(
      this.cameraService.hasCamera$.pipe(
        takeUntil(this.destroy$)
      ).subscribe((hasCamera) => {
        this.hasCamera = hasCamera;
        if (!hasCamera) {
          this.loadingScreenMessage = 'No Access to camera';
          this.subText = 'Please allow camera access';
          this.isScannerOn = false;
          if (this.scanner) this.scanner.stop();
          if (this.video) this.video.style.display = 'none';
          this.cdr.detectChanges();
        }
      })
    );

    this.subscriptions.add(
      this.cameraService.permissionState$.pipe(
        takeUntil(this.destroy$)
      ).subscribe((state) => {
        this.permissionState = state;
        if (state === 'granted') {

          this.loadingScreenMessage = '';
          this.subText = '';
          this.isScannerOn = true;
          this.hasCamera = true;
          if (this.scanner) this.scanner.start();
          if (this.video) this.video.style.display = 'block';
        } else if (state === 'denied') {
          this.loadingScreenMessage = 'No Access to camera';
          this.subText = 'Please allow camera access';
          this.isScannerOn = false;
          this.hasCamera = false;
          if (this.scanner) this.scanner.stop();
          if (this.video) this.video.style.display = 'none';
        }
        this.cdr.detectChanges();
      })
    );
  }

  ngAfterViewInit(): void {
    const video = document.getElementById('qrVideo');
    const camQrResult = document.getElementById('cam-qr-result');
    this.video = video;
    this.camQrResult = camQrResult

    const scanner = new QrScanner((video as HTMLVideoElement), result => this.setResult(this.camQrResult, result), {
      onDecodeError: error => { },
      highlightScanRegion: true,
      highlightCodeOutline: true,

    });

    console.log("scanner: ", scanner);

    this.scanner = scanner;

    scanner.start().then(() => {
      QrScanner?.listCameras(true).then(cameras => cameras.forEach(camera => {
        const option = document.createElement('option');
        option.value = camera.id;
        option.text = camera.label;
      }));
    });

  }



  setResult = (label: any, result: any) => {
    this.loadingScreenMessage = "Processing...";
    console.log(result.data);
    this.beep.play();
    this.attendanceService.markAttendenceUsingQR(result.data).subscribe((data: any) => {
      console.log("data: ", data);
      if (!(data.response instanceof Array)) {
        console.log("res data: ", result.data);
        const str: string = `Attendence was marked successfully for ${JSON.parse(result.data).emp_name}`;
        (window as any).toast.show(str, "ok");
        this.cdr.detectChanges();

        history.back();
      } else {
        this.loadingScreenMessage = "hit start to start scanning...";
        const str: string = `Cannot mark attendance for ${JSON.parse(result.data).emp_name || "User"}`;

        (window as any).toast.show(str, "error");
        this.cdr.detectChanges();

      }

    }, (error) => {
      console.log("error: ", error);
      this.loadingScreenMessage = "hit start to start scanning...";
      const str: string = `Cannot mark attendance for ${JSON.parse(result.data).emp_name || "User"}`;
      this.modalHeaderText = str;

      (window as any).toast.show(str, "error");
      this.cdr.detectChanges();

    });

    this.cdr.detectChanges();
    this.toggleScanner();
  }

  goBack() {
    this.scanner.stop();
    this.router.navigate(["/"])
  }

  onModalConfirm() {
    console.log("modal confirmed");
    this.isModalOpen = false;
  }

  onModalCancelled() {
    console.log("modal cancelled");
    history.back();
    this.isModalOpen = false;
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

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if (this.scanner)
      this.scanner.stop();

    this.destroy$.next();
  }
}
