import { Component, OnInit } from '@angular/core';
import { Html5QrcodeScanner } from 'html5-qrcode';

@Component({
  selector: 'app-qrscanner',
  templateUrl: './qrscanner.component.html',
  styleUrls: ['./qrscanner.component.scss']
})
export class QrscannerComponent implements OnInit {
  barCodeFormats: any = ['QR_CODE'];
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const html5QrCodeScanner = new Html5QrcodeScanner(
      'qr-code-scanner', { fps: 10, qrbox: 250 }, false);

    html5QrCodeScanner.render(this.onScanSuccess, this.onScanFailure);
  }

  onScanSuccess(decodedText: string, decodedResult: any): void {
    console.log(`Scan result: ${decodedText}`, decodedResult);
    alert(`Scan result: ${decodedText} ||| ${decodedResult}`)
    // Handle the scanned result
  }

  onScanFailure(error: any): void {
    console.warn(`Scan failed: ${error}`);
    // Handle scan failure
  }
}
