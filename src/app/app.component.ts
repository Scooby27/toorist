import { Component, OnInit } from '@angular/core';

import { LoadingService } from './shared/loading.service';
import { HomeComponent } from './shared/home.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  show = false;
  rootPage = HomeComponent;

  constructor (private loadingService: LoadingService) {

  }

  ngOnInit(): void {
    this.loadingService.behaviourSubject.subscribe((show: boolean) => {
      this.show = show;
    });
  }
}
