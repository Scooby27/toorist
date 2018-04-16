import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date-struct';

import { Location } from '../../location';
import { NgbDateStructAdapter } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date-adapter';

@Component({
  selector: 'app-location-modal',
  templateUrl: './location-modal.component.html',
  styleUrls: ['./location-modal.component.css']
})
export class LocationModalComponent implements OnInit {
  @Output() addLocationEmitter = new EventEmitter<Location>();
  addMore = false;
  startDate: NgbDateStruct;
  endDate: NgbDateStruct;
  title = 'Add Location';
  submitLabel = 'Add';

  private autoComplete: google.maps.places.Autocomplete;
  constructor(private bsModalRef: BsModalRef, private toastrService: ToastrService) { }

  ngOnInit(): void {
    const options = {
      types: ['(cities)']
    };

    const input = this.getAutoCompleteInputElement();
    this.autoComplete = new google.maps.places.Autocomplete(input, options);
  }

  addLocation(): void {
    const placeResult = this.autoComplete.getPlace();
    if (placeResult !== void 0 && this.startDate !== void 0 &&  this.endDate !== void 0) {
      const location = new Location();
      location.city = placeResult.name;
      location.latitude = placeResult.geometry.location.lat();
      location.longitude = placeResult.geometry.location.lng();
      location.startDateMilliseconds = this.ngbDateStructToDate(this.startDate).getTime();
      location.endDateMilliseconds = this.ngbDateStructToDate(this.endDate).getTime();
      this.addLocationEmitter.emit(location);
      this.addMore = true;
      this.reset();
    } else {
      this.toastrService.error('Oops! You have missed some information!');
    }
  }

  updateDates(isStartDateChange: boolean): void {
    const start = this.ngbDateStructToDate(this.startDate);
    const end = this.ngbDateStructToDate(this.endDate);
    if (isStartDateChange && start > end || this.endDate === void 0) {
      this.endDate = this.startDate;
    } else if (!isStartDateChange && end < start || this.startDate === void 0) {
      this.startDate = this.endDate;
    }
  }

  setLocation(location: Location): void {
    this.getAutoCompleteInputElement().value = location.city;
    const start = new Date(location.startDateMilliseconds);
    this.startDate = {
      year: start.getFullYear(),
      month: start.getMonth() + 1,
      day: start.getDate()
    };
    const end = new Date(location.endDateMilliseconds);
    this.endDate = {
      year: end.getFullYear(),
      month: end.getMonth() + 1,
      day: end.getDate()
    };
  }

  private reset(): void {
    const input = this.getAutoCompleteInputElement();
    input.value = '';
    input.textContent = '';
    this.startDate = null;
    this.endDate = null;
  }

  private ngbDateStructToDate(ngbDate: NgbDateStruct): Date {
    let result: Date = null;
    if (ngbDate !== null && ngbDate !== void 0) {
      result = new Date(ngbDate.year, ngbDate.month - 1, ngbDate.day);
    }
    return result;
  }

  private getAutoCompleteInputElement(): HTMLInputElement {
    return <HTMLInputElement>document.getElementById('autocomplete');
  }

}
