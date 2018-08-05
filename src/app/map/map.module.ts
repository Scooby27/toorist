import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core/core.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IonicModule } from 'ionic-angular/module';
import { Geolocation } from '@ionic-native/geolocation';
import { DatePicker } from '@ionic-native/date-picker';
import { CommonModule } from '../../../node_modules/@angular/common';

import { MapComponent } from './map/map.component';
import { SharedModule } from '../shared/shared.module';
import { LocationService } from './location.service';
import { LocationModalComponent } from './modals/location-modal/location-modal.component';
import { LocationComponent } from './location/location.component';
import { ListComponent } from './list/list.component';
import { StatsComponent } from './stats/stats.component';
import { TimelineComponent } from './timeline/timeline.component';

@NgModule({
  declarations: [
    MapComponent,
    StatsComponent,
    ListComponent,
    LocationModalComponent,
    LocationComponent,
    TimelineComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgbModule.forRoot(),
    IonicModule.forRoot(LocationComponent),
    AgmCoreModule.forRoot({apiKey: 'AIzaSyCN0d30qHE_S9CkDarkURUAzis4L1Tfzfw', libraries: ['places']})
  ],
  exports: [
    MapComponent
  ],
  entryComponents: [MapComponent, StatsComponent, ListComponent, LocationModalComponent, TimelineComponent],
  providers: [LocationService, Geolocation, DatePicker]
})
export class MapModule { }
