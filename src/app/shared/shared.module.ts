import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgSelectModule } from '@ng-select/ng-select';
import { ErrorComponent } from './error.component';
import { LoadingService } from './loading.service';
import { LoadingIndicatorComponent } from './loadingIndicator.component';


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
