import { Injectable, ApplicationRef } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { first, switchMap, mapTo, timeout, catchError } from 'rxjs/operators';
import { Observable, of, timer, from } from 'rxjs';

declare const qrcode: any;

@Injectable({
  providedIn: 'root'
})
export class QrCodeReader {

  decode(file: any): Observable<string> {
    return new Observable(observer => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e: any) => {
        const data = e.target.result;
        qrcode.callback = (res) => {
          observer.next(res);
          observer.complete();
        };
        qrcode.decode(data);
      };
    });
  }

}
