import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { IonicApp, IonicModule } from 'ionic-angular';


import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { appRoutes } from './routes';
import { MapComponent } from './map/map.component';
import { MapModule } from './map/map.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    MapModule,
    IonicModule.forRoot(AppComponent),
    RouterModule.forRoot(appRoutes),
    SharedModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({positionClass: 'toast-bottom-center'}),
    environment.production ? ServiceWorkerModule.register('/ngsw-worker.js') : []
  ],
  providers: [],
  bootstrap: [IonicApp]
})
export class AppModule { }
