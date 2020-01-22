import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BarcodeFormat } from '@zxing/library';
import { Router } from '@angular/router';
import { QrCodeReader } from 'src/app/services/qr-code-reader.service';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  hasCameraAccess = false;

  stationForm: FormGroup = new FormGroup({
    stationId: new FormControl('', [Validators.required]),
  });

  allowedFormats = [ BarcodeFormat.QR_CODE ];

  scannerEnabled = false;
  torch = false;

  scannedValue = '';

  constructor(private router: Router, private qrCodeReader: QrCodeReader) {
    if('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices){
      navigator.mediaDevices.enumerateDevices().then(devices => {
        this.hasCameraAccess = devices.some(device => 'videoinput' === device.kind);
      });
    }
  }

  ngOnInit() {
  }

  // hasDevices(event) {
  //   this.hasCameraAccess = event;
  // }

  scan() {
    this.scannerEnabled = true;
    this.scannedValue = '';
  }

  stop() {
    this.scannerEnabled = false;
  }

  toggleTorch() {
    this.torch != this.torch;
  }

  scanSuccessHandler(event) {
    console.log('success: ', event);
    this.scannerEnabled = false;
    if (event) {
      this.scannedValue = event;
    }
  }

  onFileChange(event) {
    const file = event.target.files[0];
    this.qrCodeReader.decode(file).subscribe(decodedString => {
      this.scannedValue = decodedString;
    });
  }

  submit() {
    console.log(this.stationForm.value);
  }

  logout() {
    localStorage.removeItem('authToken');
    this.router.navigate(["/login"]);
  }

  detectWebcam(callback) {
    let md = navigator.mediaDevices;
    if (!md || !md.enumerateDevices) return callback(false);
    md.enumerateDevices().then(devices => {
      callback(devices.some(device => 'videoinput' === device.kind));
    })
  }

}
