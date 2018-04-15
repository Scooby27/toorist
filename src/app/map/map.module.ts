import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core/core.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MapComponent } from './map.component';
import { SharedModule } from '../shared/shared.module';
import { MapService } from './map.service';
import { AddLocationModalComponent } from './modals/add-location-modal/add-location-modal.component';
import { LocationComponent } from './location/location.component';

@NgModule({
  declarations: [
    MapComponent,
    AddLocationModalComponent,
    LocationComponent
  ],
  imports: [
    SharedModule,
    NgbModule.forRoot(),
    AgmCoreModule.forRoot({apiKey: 'AIzaSyDa6c-mJ82lZPB-0HOE59WquzqStIM_DOc', libraries: ['places']})
  ],
  exports: [
    MapComponent
  ],
  entryComponents: [AddLocationModalComponent],
  providers: [MapService]
})
export class MapModule { }
