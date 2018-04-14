import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { ApiService } from '../core/apiService';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private toastrService: ToastrService, private router: Router) {
  }

  login(): void {
    this.toastrService.success('Welcome home.');
    this.router.navigate(['/map']);
  }
}
