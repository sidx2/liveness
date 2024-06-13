import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import QrScanner from "qr-scanner"
import { QrService } from '../../../services/qr.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-qr2',
  templateUrl: './qr2.component.html',
  styleUrls: ['./qr2.component.scss']
})
export class Qr2Component implements OnInit {
  scanner: any
  isScannerOn: Boolean = true;
  beep = new Audio("assets/beep-07a.mp3")

  constructor(
    private qrs: QrService,
    private toastr: ToastrService,
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
      this.qrs.markAttendenceUsingQR(result.data).subscribe((data) => {
        console.log("res data: ", data);
        const str: string = `Attendence was marked successfully for ${JSON.parse(result.data).emp_name}`
        this.toastr.success("Attendance marked!", str);
        history.back();
        // this.router.navigate(["/"]);
      }, (error) => {
        const str: string = `Failed to mark attedance for  ${JSON.parse(result.data).emp_name}`
        this.toastr.error("Could not mark attendence", str);
        if (!confirm("Could not mark attendence! Try again?")) {
          history.back();
            // this.router.navigate(["/"])
          }
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
      QrScanner.listCameras(true).then(cameras => cameras.forEach(camera => {
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
}
