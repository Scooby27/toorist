import { AgmCoreModule } from '@agm/core/core.module';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '../../../node_modules/@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ListComponent } from './list/list.component';
import { LocationService } from './location.service';
import { LocationComponent } from './location/location.component';
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
    IonicModule.forRoot(),
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyCN0d30qHE_S9CkDarkURUAzis4L1Tfzfw', libraries: ['places'] })
  ],
  exports: [
    MapComponent
  ],
  entryComponents: [MapComponent, StatsComponent, ListComponent, LocationModalComponent, TimelineComponent],
  providers: [LocationService]
})
export class MapModule { }
