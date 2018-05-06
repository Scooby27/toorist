import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core/core.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IonicModule } from 'ionic-angular/module';
import { Geolocation } from '@ionic-native/geolocation';
import { DatePicker } from '@ionic-native/date-picker';

import { MapComponent } from './map/map.component';
import { SharedModule } from '../shared/shared.module';
import { LocationService } from './location.service';
import { LocationModalComponent } from './modals/location-modal/location-modal.component';
import { LocationComponent } from './location/location.component';
import { ListComponent } from './list/list.component';
import { StatsComponent } from './stats/stats.component';

@NgModule({
  declarations: [
    MapComponent,
    StatsComponent,
    ListComponent,
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
  entryComponents: [MapComponent, StatsComponent, ListComponent, LocationModalComponent],
  providers: [LocationService, Geolocation, DatePicker]
})
export class MapModule { }
