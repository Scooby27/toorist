import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { MapComponent } from './map/map.component';
import { StatsComponent } from './stats/stats.component';
import { TimelineComponent } from './timeline/timeline.component';
const routes: Routes = [
    {
        path: 'map',
        component: MapComponent
    },
    {
        path: 'timeline',
        component: TimelineComponent
    },
    {
        path: 'list',
        component: ListComponent
    },
    {
        path: 'stats',
        component: StatsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MapRoutingModule { }
