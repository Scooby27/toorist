import { Component, OnInit } from '@angular/core';
import { App } from 'ionic-angular/components/app/app';

import { MapComponent } from '../../map/map/map.component';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(private appCtrl: App) { }

  ngOnInit(): void {
    this.appCtrl.getRootNavs()[0].push(MapComponent);
  }

}
