import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core/core.module';

import { MapComponent } from './map.component';
import { SharedModule } from '../shared/shared.module';
import { MapService } from './map.service';
import { AddLocationModalComponent } from './add-location-modal/add-location-modal.component';

@NgModule({
  declarations: [
    MapComponent,
    AddLocationModalComponent
  ],
  imports: [
    SharedModule,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyDa6c-mJ82lZPB-0HOE59WquzqStIM_DOc', libraries: ['places']})
  ],
  exports: [
    MapComponent
  ],
  entryComponents: [AddLocationModalComponent],
  providers: [MapService]
})
export class MapModule { }
