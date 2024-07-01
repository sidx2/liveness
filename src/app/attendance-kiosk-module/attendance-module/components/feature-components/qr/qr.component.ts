import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import QrScanner from "qr-scanner"
import { AttendanceService } from '../../../services/attendance.service';
import { Router } from '@angular/router';
import { CookieService } from 'src/app/services/cookie.service';
import { HttpClient } from '@angular/common/http';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-qr2',
  templateUrl: './qr.component.html',
  styleUrls: ['./qr.component.scss']
})
export class QrComponent implements OnInit {
  scanner: any;
  video: any;
  camQrResult: any
  isScannerOn: Boolean = true;
  destroy$ = new Subject<void>();

  beep = new Audio("assets/beep-07a.mp3")

  isModalOpen = false;
  loadingScreenMessage = "Hit Start to start the scanning...";
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
    console.log("toggling scanner!")
    if (this.isScannerOn) {
      this.scanner.stop();
      this.video.style.display = "none";
      
    } else {
      this.scanner.start();
      this.video.style.display = "block";
      // this.videoPlaceholder.style.display = "none";

    }
    
    this.isScannerOn = !this.isScannerOn;
    this.cdr.detectChanges();
  }

  ngOnInit() { }

  ngAfterViewInit(): void {
    // if (this.isScannerOn) {

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
    // }
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
        this.loadingScreenMessage = "Hit Start to start the scanning...";
        const str: string = `Cannot mark attendance for ${JSON.parse(result.data).emp_name || "User"}`;

        (window as any).toast.show(str, "error");
        this.cdr.detectChanges();

      }

    }, (error) => {
      console.log("error: ", error);
      this.loadingScreenMessage = "Hit Start to start the scanning...";
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

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if (this.scanner) 
    this.scanner.stop();

    this.destroy$.next();
  }
}
