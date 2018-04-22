import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core/core.module';
import { NgbModule, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { IonicModule } from 'ionic-angular/module';
import { Geolocation } from '@ionic-native/geolocation';

import { MapComponent } from './map.component';
import { SharedModule } from '../shared/shared.module';
import { MapService } from './map.service';
import { LocationModalComponent } from './modals/location-modal/location-modal.component';
import { LocationComponent } from './location/location.component';
import { GBDateParser } from './modals/location-modal/gbDateParser';

@NgModule({
  declarations: [
    MapComponent,
    LocationModalComponent,
    LocationComponent
  ],
  imports: [
    SharedModule,
    NgbModule.forRoot(),
    IonicModule.forRoot(LocationComponent),
    AgmCoreModule.forRoot({apiKey: 'AIzaSyDa6c-mJ82lZPB-0HOE59WquzqStIM_DOc', libraries: ['places']})
  ],
  exports: [
    MapComponent
  ],
  entryComponents: [LocationModalComponent],
  providers: [MapService, Geolocation, {provide: NgbDateParserFormatter, useClass: GBDateParser}]
})
export class MapModule { }
