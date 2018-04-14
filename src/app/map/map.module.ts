import { NgModule } from '@angular/core';

import { MapComponent } from './map.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    MapComponent
  ],
  imports: [SharedModule],
  exports: [
    MapComponent
  ],
  providers: []
})
export class CanvasModule { }
