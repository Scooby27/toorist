import { Component, OnInit } from '@angular/core';
import { App } from 'ionic-angular/components/app/app';

import { MapComponent } from '../map/map/map.component';
import { ListComponent } from '../map/list/list.component';
import { StatsComponent } from '../map/stats/stats.component';

@Component({
  selector: 'app-nav-bar',
  styleUrls: ['nav-bar.component.css'],
  templateUrl: './nav-bar.component.html'
})

export class NavBarComponent implements OnInit {
  components;

  constructor(private appCtrl: App) {
  }

  ngOnInit(): void {
    this.components = {
      map: MapComponent,
      list: ListComponent,
      stats: StatsComponent
    };
  }

  navigateTo(component): void {
    this.appCtrl.getRootNavs()[0].push(component);
  }
}
