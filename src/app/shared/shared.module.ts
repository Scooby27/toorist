import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';

import { ErrorComponent } from './error.component';
import { HomeComponent } from './home.component';
import { LoadingIndicatorComponent } from './loadingIndicator.component';
import { LoadingService } from './loading.service';

@NgModule({
  declarations: [
    HomeComponent,
    ErrorComponent,
    LoadingIndicatorComponent
  ],
  imports: [
    CommonModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ],
  exports: [
    HomeComponent,
    ErrorComponent,
    CommonModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule,
    LoadingIndicatorComponent],
  providers: [LoadingService, BsModalService]
})
export class SharedModule { }
