import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-nav-bar',
  styleUrls: ['nav-bar.component.css'],
  templateUrl: './nav-bar.component.html'
})

export class NavBarComponent {

  constructor(private navController: NavController) {
  }

  navigateTo(url: string): void {
    this.navController.navigateForward('/' + url);
  }
}
