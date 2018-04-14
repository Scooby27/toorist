import { Routes } from '@angular/router';

import { ErrorComponent } from './shared/error.component';
import { HomeComponent } from './shared/home.component';
import { MapComponent } from './map/map.component';

export const appRoutes: Routes = [
  { path: 'map', component: MapComponent },
  { path: '', component: HomeComponent },
  { path: '**', component: ErrorComponent }
];
