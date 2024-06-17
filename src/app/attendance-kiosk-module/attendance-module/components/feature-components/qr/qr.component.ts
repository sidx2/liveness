import { Component, OnInit } from '@angular/core';
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
  isScannerOn: Boolean = true;
  beep = new Audio("assets/beep-07a.mp3")

  isModalOpen = false
  modalHeaderText = "Could not mark attendence! Try again?"
  modalMessage = "Action cannot be undone"
  modalProceedText = "Try again"
  modalCancalText = "Take me back"

  constructor(
    private attendanceService: AttendanceService,
    private router: Router,
  ) { }

  toggleScanner() {
    if (this.isScannerOn) {
      this.scanner.stop();
    } else this.scanner.start();
    this.isScannerOn = !this.isScannerOn;
  }

  ngOnInit(): void {
    const video = document.getElementById('qrVideo');
    const camQrResult = document.getElementById('cam-qr-result');

    const setResult = (label: any, result: any) => {
      console.log(result.data);
      this.beep.play();
      this.attendanceService.markAttendenceUsingQR(result.data).subscribe((data: any) => {
        console.log("res data: ", data);
        const str: string = `Attendence was marked successfully for ${data.response.emp_name}`;
        // this.toastr.success(str);
        (window as any).toast.show(str, "ok");
        history.back();

      }, (error) => {
        console.log("error: ", error);
        const str: string = `Failed to mark attedance. ${error}`
        this.modalHeaderText = str;
        // this.toastr.error(str);
        (window as any).toast.show(str, "ok");
        this.isModalOpen = true;
      });

      scanner.stop();
    }


    const scanner = new QrScanner((video as HTMLVideoElement), result => setResult(camQrResult, result), {
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
