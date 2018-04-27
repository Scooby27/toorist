import { Component, OnInit } from '@angular/core';
import { App } from 'ionic-angular/components/app/app';

import { MapComponent } from '../map/map.component';
import { HomeComponent } from '../shared/home.component';

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
      home: HomeComponent,
      map: MapComponent
    };
  }

  navigateTo(component): void {
    this.appCtrl.getRootNavs()[0].push(component);
  }
}
