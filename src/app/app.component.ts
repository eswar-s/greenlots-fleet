import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'greenlots-fleet-new';

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      "glf-qr",
      this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/svg/qr.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "glf-flash",
      this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/svg/flash.svg")
    );
  }

}
