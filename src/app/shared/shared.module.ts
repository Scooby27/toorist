import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { IonicModule } from 'ionic-angular';

import { ErrorComponent } from './error.component';
import { LoadingIndicatorComponent } from './loadingIndicator.component';
import { LoadingService } from './loading.service';

@NgModule({
  declarations: [
    ErrorComponent,
    LoadingIndicatorComponent
  ],
  imports: [
    CommonModule,
    NgSelectModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule
  ],
  exports: [
    ErrorComponent,
    CommonModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    LoadingIndicatorComponent],
  providers: [LoadingService]
})
export class SharedModule { }
