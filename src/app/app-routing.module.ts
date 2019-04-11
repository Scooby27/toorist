import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './map/list/list.component';
import { MapComponent } from './map/map/map.component';
import { StatsComponent } from './map/stats/stats.component';
import { TimelineComponent } from './map/timeline/timeline.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'map',
        pathMatch: 'full'
    },
    {
        path: 'map',
        loadChildren: './map/map.module#MapModule'
    },
    {
        path: 'timeline',
        loadChildren: './map/map.module#MapModule'
    },
    {
        path: 'list',
        loadChildren: './map/map.module#MapModule'
    },
    {
        path: 'stats',
        loadChildren: './map/map.module#MapModule'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload', urlUpdateStrategy: 'eager' })],
    exports: [RouterModule]
})
export class AppRoutingModule { }