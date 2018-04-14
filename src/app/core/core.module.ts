import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { NavBarComponent } from './nav-bar.component';
import { ApiService } from './apiService';

@NgModule({
  imports: [ CommonModule, HttpClientModule, RouterModule ],
  exports: [ NavBarComponent ],
  declarations: [ NavBarComponent ],
  providers: [ ApiService ]
})

export class CoreModule { }
