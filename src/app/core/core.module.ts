import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ApiService } from './apiService';
import { LandingComponent } from './landing/landing.component';
import { NavBarComponent } from './nav-bar.component';


@NgModule({
  imports: [CommonModule, HttpClientModule, IonicModule],
  exports: [NavBarComponent],
  declarations: [NavBarComponent, LandingComponent],
  entryComponents: [LandingComponent],
  providers: [ApiService]
})

export class CoreModule { }
