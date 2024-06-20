import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import QrScanner from "qr-scanner"
import { AttendanceService } from '../../../services/attendance.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-qr2',
  templateUrl: './qr.component.html',
  styleUrls: ['./qr.component.scss']
})
export class QrComponent implements OnInit {
  scanner: any
  video: any
  camQrResult: any
  isScannerOn: Boolean = true;
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
  ) { }

  toggleScanner() {
    console.log("toggling scanner!")
    if (this.isScannerOn) {
      this.scanner.stop();
    } else this.scanner.start();
    // } else {
    //   this.scanner = new QrScanner((this.video as HTMLVideoElement), result => this.setResult(this.camQrResult, result), {
    //     onDecodeError: error => { },
    //     highlightScanRegion: true,
    //     highlightCodeOutline: true,
    //   });
    // }
    this.isScannerOn = !this.isScannerOn;
    this.cdr.detectChanges();
  }

  ngOnInit () {}
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
    setResult (label: any, result: any) {
      console.log(result.data);
      this.beep.play();
      this.attendanceService.markAttendenceUsingQR(result.data).subscribe((data: any) => {
        console.log("data: ", data);
        if (!(data.response instanceof Array)) {
          console.log("res data: ", result.data);
          const str: string = `Attendence was marked successfully for ${JSON.parse(result.data).emp_name}`;
          // this.toastr.success(str);
          (window as any).toast.show(str, "ok");
          history.back();
        } else {
          const str: string = `Cannot mark attendance for ${JSON.parse(result.data).emp_name}`;
          // this.toastr.success(str);
          (window as any).toast.show(str, "error");
        }
        
      }, (error) => {
        this.toggleScanner();
        console.log("error: ", error);
        const str: string = `Failed to mark attedance. ${error}`;
        // this.modalHeaderText = str;
        // this.isModalOpen = true;
        (window as any).toast.show(str, "error");
      });
      
      this.scanner.stop();
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
}
