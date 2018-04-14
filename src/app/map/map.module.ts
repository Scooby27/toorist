import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core/core.module';

import { MapComponent } from './map.component';
import { SharedModule } from '../shared/shared.module';
import { MapService } from './map.service';

@NgModule({
  declarations: [
    MapComponent
  ],
  imports: [
    SharedModule,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyDa6c-mJ82lZPB-0HOE59WquzqStIM_DOc'})
  ],
  exports: [
    MapComponent
  ],
  providers: [MapService]
})
export class MapModule { }
