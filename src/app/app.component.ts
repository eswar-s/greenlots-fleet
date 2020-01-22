import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ConnectionService } from 'ng-connection-service';
import { trigger, transition, query, animate, style, animateChild } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('grow', [
      transition(':enter', [
        style({ height: 0 }),
        animate(300, style({height: '*'}))
      ]),
      transition(':leave', [
        style({ height: '*' }),
        animate(300, style({height: 0}))
      ]),
    ]),
  ],
})
export class AppComponent {

  title = 'greenlots-fleet-new';
  connected = true;

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private connectionService: ConnectionService
  ) {
    this.matIconRegistry.addSvgIcon(
      "glf-qr",
      this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/svg/qr.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "glf-flash",
      this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/svg/flash.svg")
    );

    this.connectionService.monitor().subscribe(connected => {
      this.connected = connected;
    });
  }

}
