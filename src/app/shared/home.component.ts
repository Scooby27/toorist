import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { App } from 'ionic-angular/components/app/app';

import { MapComponent } from '../map/map.component';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private toastrService: ToastrService, private appCtrl: App) {
  }

  login(): void {
    this.toastrService.success('Welcome home.');
    this.appCtrl.getRootNav().push(MapComponent);
  }
}
