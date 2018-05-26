import { Component, OnInit } from '@angular/core';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { LatLngLiteral } from '@agm/core/map-types';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';

import { LocationService } from '../location.service';
import { Location } from '../location';
import { LocationModalComponent } from '../modals/location-modal/location-modal.component';
import { MapStyles } from '../mapStyles';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  latitude = 0;
  longitude = 0;
  currentLatitude = 0;
  currentLongitude = 0;
  currentLocation: Location;
  locations: Array<Location>;
  zoom: number;
  currentLocationObtained = false;
  styles = MapStyles.retro;

  constructor(
    private locationService: LocationService,
    private modalCtrl: ModalController,
    private toastController: ToastController,
    private geolocation: Geolocation) {
  }

  ngOnInit(): void {
    this.zoom = 2;
    this.locations = this.locationService.getStoredLocations();
    this.loadCurrentLocation();
  }

  goToCurrentLocation(): void {
    this.latitude = this.currentLatitude;
    this.longitude = this.currentLongitude;
    this.zoom = 8;
  }

  addLocation(): void {
    const locationModal = this.modalCtrl.create(
      LocationModalComponent,
      { title: 'Add Location', submitLabel: 'Add' }
    );
    locationModal.present();
    locationModal.onWillDismiss((location: Location) => {
      if (location !== void 0) {
        location.id = this.locationService.getNextUniqueId();
        const oldLocations = Object.assign([], this.locations);
        oldLocations.push(location);
        oldLocations.sort((a, b) => {
          return a.city < b.city ? -1 : 1;
        });
        this.locations = Object.assign([], oldLocations);
        this.locationService.setStoredLocations(this.locations);
        this.toastController.create({
          message: location.city + ' has been added to your visited locations! Keep adding more!',
          position: 'top',
          duration: 3000,
          cssClass: 'toastSuccess'
        }).present();
      }
    });
  }

  updateMapCoordinates(coordinates: LatLngLiteral): void {
    this.longitude = coordinates.lng;
    this.latitude = coordinates.lat;
  }

  updateZoom(zoom: number): void {
    this.zoom = zoom;
  }

  private loadCurrentLocation(): void {
    this.geolocation.watchPosition().subscribe((position: Geoposition) => {
      this.currentLocationObtained = true;
      this.currentLatitude = position.coords.latitude;
      this.currentLongitude = position.coords.longitude;
      this.updateCurrentLocation();
    });
  }

  private updateCurrentLocation(): void {
    this.locationService.getLocation(this.currentLatitude, this.currentLongitude).subscribe((response) => {
      if (response.status === google.maps.GeocoderStatus.OK && response.results[0] !== void 0) {
        this.currentLocation = new Location();
        this.currentLocation.city = response.results[0].formatted_address;
      }
    }, (error) => {
      this.toastController.create({
        message: error,
        position: 'bottom',
        duration: 3000,
        cssClass: 'toastError'
      }).present();
    });
  }
}
