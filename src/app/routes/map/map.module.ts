import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ZXingScannerModule } from '@zxing/ngx-scanner';

import { MapRoutingModule } from './map-routing.module';
import { MapComponent } from './map.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [MapComponent],
  imports: [
    CommonModule,
    SharedModule,
    ZXingScannerModule,
    MapRoutingModule
  ]
})
export class MapModule { }
