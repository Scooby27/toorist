import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from 'ionic-angular/module';

import { NavBarComponent } from './nav-bar.component';
import { ApiService } from './apiService';

@NgModule({
  imports: [ CommonModule, HttpClientModule, IonicModule.forRoot(NavBarComponent) ],
  exports: [ NavBarComponent ],
  declarations: [ NavBarComponent ],
  providers: [ ApiService ]
})

export class CoreModule { }
