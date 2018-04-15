import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

import { Location } from '../../location';

@Component({
  selector: 'app-add-location-modal',
  templateUrl: './add-location-modal.component.html',
  styleUrls: ['./add-location-modal.component.css']
})
export class AddLocationModalComponent implements OnInit {
  @Output() addLocationEmitter = new EventEmitter<Location>();
  addMore = false;
  model;

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
    if (placeResult !== void 0) {
      const location = new Location();
      location.city = placeResult.name;
      location.latitude = placeResult.geometry.location.lat();
      location.longitude = placeResult.geometry.location.lng();
      this.addLocationEmitter.emit(location);
      this.addMore = true;
      const input = this.getAutoCompleteInputElement();
      input.value = '';
      input.textContent = '';
    } else {
      this.toastrService.error('Oops! You have not entered a location!');
    }
  }

  private getAutoCompleteInputElement(): HTMLInputElement {
    return <HTMLInputElement>document.getElementById('autocomplete');
  }

}
