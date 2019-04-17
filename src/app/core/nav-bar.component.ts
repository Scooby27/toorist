import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  styleUrls: ['nav-bar.component.css'],
  templateUrl: './nav-bar.component.html'
})

export class NavBarComponent {

  constructor(private router: Router) {
  }

  navigateTo(url: string): void {
    this.router.navigate(['/' + url]);
  }
}
