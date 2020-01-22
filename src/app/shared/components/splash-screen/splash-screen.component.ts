import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, ApplicationRef } from '@angular/core';
import { animate, animateChild, query, style, transition, trigger } from '@angular/animations';
import { PwaService } from 'src/app/services/pwa.service';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss'],
  animations: [
    trigger('fadeOut', [
        transition(':leave', [
            query(':leave', animateChild(), {optional: true}),
            animate(300, style({opacity: 0}))
        ]),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SplashScreenComponent implements OnInit {

  show = true;

  constructor(private pwaService: PwaService,
    private cdr: ChangeDetectorRef,
    private appRef: ApplicationRef
  ) { }

  ngOnInit() {
    this.pwaService.checkForUpdate().subscribe(result => {
      this.show = result;
      this.cdr.detectChanges();
    });
  }

}
