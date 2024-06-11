import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import QrScanner from "qr-scanner"
import { QrService } from '../../../services/qr.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

export interface InversionMode {
  mode: "original" | "invert" | "both";
}

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
    const videoContainer = document.getElementById('videContainer');
    // const camHasCamera = document.getElementById('cam-has-camera');
    // const camList = document.getElementById('cam-list');
    // const camHasFlash = document.getElementById('cam-has-flash');
    // const flashToggle = document.getElementById('flash-toggle');
    // const flashState = document.getElementById('flash-state');
    const camQrResult = document.getElementById('cam-qr-result');
    // const camQrResultTimestamp = document.getElementById('cam-qr-result-timestamp');
    const fileSelector = document.getElementById('file-selector');
    const fileQrResult = document.getElementById('file-qr-result');

    

    const setResult = (label: any, result: any) => {
      console.log(result.data);
      this.beep.play();
      this.qrs.markAttendenceUsingQR(result.data).subscribe(data => {
        this.toastr.success("Attendance marked!", "Attendence was marked successfully");
        console.log("res data: ", data);

        this.router.navigate(["/"]);
      }, (error) => {
        this.toastr.error("Could not mark attendence", "Failed to mark attedance");
          if (!confirm("Could not mark attendence! Try again?")) {
            this.router.navigate(["/"])
          }
      });
      // label.textContent = result.data;
      // camQrResultTimestamp.textContent = new Date().toString();
      // label.style.color = 'teal';
      // clearTimeout(label.highlightTimeout);
      // label.highlightTimeout = setTimeout(() => label.style.color = 'inherit', 100);
      scanner.stop();
    }

    // ####### Web Cam Scanning #######

    const scanner = new QrScanner((video as HTMLVideoElement), result => setResult(camQrResult, result), {
      onDecodeError: error => {
        // camQrResult.textContent = String(error);
        // camQrResult.style.color = 'inherit';
      },
      highlightScanRegion: true,
      highlightCodeOutline: true,
    });

    this.scanner = scanner;

    const updateFlashAvailability = () => {
      scanner.hasFlash().then(hasFlash => {
        // camHasFlash.textContent = String(hasFlash);
        // flashToggle.style.display = hasFlash ? 'inline-block' : 'none';
      });
    };

    scanner.start().then(() => {
      updateFlashAvailability();
      // List cameras after the scanner started to avoid listCamera's stream and the scanner's stream being requested
      // at the same time which can result in listCamera's unconstrained stream also being offered to the scanner.
      // Note that we can also start the scanner after listCameras, we just have it this way around in the demo to
      // start the scanner earlier.
      QrScanner.listCameras(true).then(cameras => cameras.forEach(camera => {
        const option = document.createElement('option');
        option.value = camera.id;
        option.text = camera.label;
        // camList.appendChild(option);
      }));
    });

    // QrScanner.hasCamera().then(hasCamera => camHasCamera.textContent = String(hasCamera));

    // for debugging
    // window.scanner = scanner;

    // document.getElementById('scan-region-highlight-style-select').addEventListener('change', (e) => {
    //   videoContainer.className = (e.target as HTMLInputElement).value;
      // scanner._updateOverlay(); // reposition the highlight because style 2 sets position: relative
      // scanner.$overlay
    // });

    // document.getElementById('show-scan-region').addEventListener('change', (e) => {
    //   const input = e.target;
    //   const label = (input as HTMLInputElement).parentNode;
    //   label.parentNode.insertBefore(scanner.$canvas, label.nextSibling);
    //   scanner.$canvas.style.display = (input as HTMLInputElement).checked ? 'block' : 'none';
    // });

    // document.getElementById('inversion-mode-select').addEventListener('change', event => {
      // scanner.setInversionMode((event.target as HTMLInputElement).value);
    // });

    // camList.addEventListener('change', event => {
    //   scanner.setCamera((event.target as HTMLInputElement).value).then(updateFlashAvailability);
    // });

    // flashToggle.addEventListener('click', () => {
    //   scanner.toggleFlash().then(() => flashState.textContent = scanner.isFlashOn() ? 'on' : 'off');
    // });

    // document.getElementById('start-button').addEventListener('click', () => {
    //   scanner.start();
    //   this.isScannerOn = !this.isScannerOn
    // });
    
    // document.getElementById('stop-button').addEventListener('click', () => {
    //   this.isScannerOn = !this.isScannerOn
      
    //   scanner.stop();
    // });
    
    

    // ####### File Scanning #######

    // fileSelector.addEventListener('change', event => {
    //   const file = (fileSelector as HTMLInputElement).files[0];
    //   if (!file) {
    //     return;
    //   }
    //   QrScanner.scanImage(file, { returnDetailedScanResult: true })
    //     .then(result => setResult(fileQrResult, result))
    //     .catch(e => setResult(fileQrResult, { data: e || 'No QR code found.' }));
    // });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.scanner.stop();
    this.isScannerOn = false;
  }
  
}
