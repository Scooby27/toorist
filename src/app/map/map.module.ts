import { AgmCoreModule } from '@agm/core';
import { NgModule } from '@angular/core';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '../../../node_modules/@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ListComponent } from './list/list.component';
import { LocationService } from './location.service';
import { LocationComponent } from './location/location.component';
import { MapRoutingModule } from './map-routing.module';
import { MapComponent } from './map/map.component';
import { LocationModalComponent } from './modals/location-modal/location-modal.component';
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
    MapRoutingModule,
    IonicModule,
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyAkEMED48bgfngouGNnnBuo8A96zhgZuoU', libraries: ['places'] })
  ],
  exports: [
    MapComponent
  ],
  entryComponents: [MapComponent, StatsComponent, ListComponent, LocationModalComponent, TimelineComponent],
  providers: [LocationService, Geolocation, DatePicker]
})
export class MapModule { }
