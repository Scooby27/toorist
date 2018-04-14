import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { appRoutes } from './routes';
import { MapComponent } from './map/map.component';
import { AgmCoreModule } from '@agm/core/core.module';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    RouterModule.forRoot(appRoutes),
    AgmCoreModule.forRoot({apiKey: 'AIzaSyDa6c-mJ82lZPB-0HOE59WquzqStIM_DOc'}),
    SharedModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    environment.production ? ServiceWorkerModule.register('/ngsw-worker.js') : []
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
