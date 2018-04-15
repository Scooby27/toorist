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
  location: Location;

  private autoComplete: google.maps.places.Autocomplete;
  constructor(private bsModalRef: BsModalRef, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.location = new Location();

    const options = {
      types: ['(cities)']
    };

    const input = <HTMLInputElement>document.getElementById('autocomplete');
    this.autoComplete = new google.maps.places.Autocomplete(input, options);
  }

  addLocation(): void {
    const placeResult = this.autoComplete.getPlace();
    if (placeResult !== void 0) {
      this.location.city = placeResult.name;
      this.location.latitude = placeResult.geometry.location.lat();
      this.location.longitude = placeResult.geometry.location.lng();
      this.addLocationEmitter.emit(this.location);
      this.bsModalRef.hide();
    } else {
      this.toastrService.error('Oops! You have not entered a location!');
    }
  }

}
