import { Component, AfterViewInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { DatePicker } from '@ionic-native/date-picker';
import * as EmojiFlags from 'emoji-flags';

import { Location } from '../../location';
import { CountryContinentEnum } from '../../countryContinentEnum';

@Component({
  selector: 'app-location-modal',
  templateUrl: './location-modal.component.html',
  styleUrls: ['./location-modal.component.css']
})
export class LocationModalComponent implements AfterViewInit {
  addMore = false;
  startDate: string;
  endDate: string;
  title: string;
  submitLabel: string;
  defaultPlace: google.maps.places.PlaceResult;

  private autoComplete: google.maps.places.Autocomplete;

  constructor(private params: NavParams, private viewCtrl: ViewController,
    private datePicker: DatePicker, private toastrService: ToastrService) {
  }

  ngAfterViewInit(): void {
    this.setInputParameters();
    const options = {
      types: ['(cities)']
    };

    const input = this.getAutoCompleteInputElement();
    this.autoComplete = new google.maps.places.Autocomplete(input, options);
  }

  addLocation(): void {
    let placeResult = this.autoComplete.getPlace();
    placeResult = placeResult === void 0 ? this.defaultPlace : placeResult;
    if (placeResult !== void 0 && this.startDate !== void 0 &&  this.endDate !== void 0) {
      const location = new Location();
      location.city = placeResult.name;
      location.latitude = placeResult.geometry.location.lat();
      location.longitude = placeResult.geometry.location.lng();
      location.startDateMilliseconds = new Date(this.startDate).getTime();
      location.endDateMilliseconds = new Date(this.endDate).getTime();
      location.defaultPlace = placeResult;
      for (let i = 0; i < placeResult.address_components.length; i++) {
        if (placeResult.address_components[i].types.includes('country')) {
          location.countryCode = placeResult.address_components[i].short_name;
          location.countryName = placeResult.address_components[i].long_name;
          location.countryFlag = EmojiFlags.countryCode(location.countryCode).emoji;
          break;
        }
      }
      location.continent = CountryContinentEnum[location.countryCode];
      this.viewCtrl.dismiss(location);
      this.addMore = true;
      this.reset();
    } else {
      this.toastrService.error('Oops! You have missed some information!');
    }
  }

  updateDates(isStartDateChange: boolean): void {
    const start = new Date(this.startDate);
    const end = new Date(this.endDate);
    if (isStartDateChange && start > end || this.endDate === void 0) {
      this.endDate = this.startDate;
    } else if (!isStartDateChange && end < start || this.startDate === void 0) {
      this.startDate = this.endDate;
    }
  }

  closeModal(): void {
    this.viewCtrl.dismiss();
  }

  private setInputParameters(): void {
    this.title = <string>this.params.get('title');
    this.submitLabel = <string>this.params.get('submitLabel');
    const initialLocation = <Location>this.params.get('initialLocation');
    if (initialLocation !== void 0) {
      this.setInitialLocation(initialLocation);
    }
  }

  private setInitialLocation(location: Location): void {
    const autocomplete = this.getAutoCompleteInputElement();
    autocomplete.value = location.city;
    const start = new Date(location.startDateMilliseconds);
    this.startDate = start.toISOString();
    const end = new Date(location.endDateMilliseconds);
    this.endDate = end.toISOString();
    this.defaultPlace = location.defaultPlace;
  }

  private reset(): void {
    const input = this.getAutoCompleteInputElement();
    input.value = '';
    input.textContent = '';
    this.startDate = '';
    this.endDate = '';
  }

  private getAutoCompleteInputElement(): HTMLInputElement {
    return <HTMLInputElement>document.getElementById('autocomplete').getElementsByTagName('input')[0];
  }

}
