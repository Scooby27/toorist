import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { LatLngLiteral } from '@agm/core/map-types';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';

import { MapService } from './map.service';
import { Location } from './location';
import { LocationModalComponent } from './modals/location-modal/location-modal.component';

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
  currentLocation: string;
  loading = false;
  locations: Array<Location>;
  localStorageId = 'toorist-locations';
  zoom: number;

  private nextUniqueId = 0;

  constructor(
    private mapService: MapService,
    private modalCtrl: ModalController,
    private toastrService: ToastrService,
    private geolocation: Geolocation) {
  }

  ngOnInit(): void {
    this.zoom = 2;
    this.locations = this.getStoredLocations();
    // this.loadCurrentLocation();
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
        location.id = this.nextUniqueId++;
        const oldLocations = Object.assign([], this.locations);
        oldLocations.push(location);
        oldLocations.sort((a, b) => {
          return a.city < b.city ? -1 : 1;
        });
        this.locations = Object.assign([], oldLocations);
        this.setStoredLocations(this.locations);
        this.toastrService.success(location.city + ' has been added to your visited locations!');
        this.toastrService.info('Great! Keep adding more!');
        this.addLocation();
      }
    });
  }

  updateLocation(location: Location): void {
    if (location.deleted) {
      this.deleteLocation(location);
    } else {
      for (let i = 0; i < this.locations.length; i++) {
        if (this.locations[i].id === location.id) {
          this.locations[i] = Object.assign({}, location);
          this.setStoredLocations(this.locations);
          this.toastrService.success('Your trip to ' + location.city + ' has been updated!');
          break;
        }
      }
    }
  }

  updateMapCoordinates(coordinates: LatLngLiteral): void {
    this.longitude = coordinates.lng;
    this.latitude = coordinates.lat;
  }

  updateZoom(zoom: number): void {
    this.zoom = zoom;
  }

  private loadCurrentLocation(): void {
    this.loading = true;
    this.geolocation.watchPosition().subscribe((position: Geoposition) => {
      this.loading = false;
      this.currentLatitude = position.coords.latitude;
      this.currentLongitude = position.coords.longitude;
      this.updateCurrentLocation();
    });
  }

  private deleteLocation(location: Location): void {
    for (let i = 0; i < this.locations.length; i++) {
      if (this.locations[i].id === location.id) {
        this.locations.splice(i, 1);
        this.setStoredLocations(this.locations);
        this.toastrService.success(location.city + ' has been deleted.');
        break;
      }
    }
  }

  private getStoredLocations(): Array<Location> {
    let storedLocations = JSON.parse(localStorage.getItem(this.localStorageId));
    storedLocations = storedLocations === null ? [] : storedLocations;
    for (let i = 0; i < storedLocations.length; i++) {
      this.nextUniqueId = storedLocations[i].id >= this.nextUniqueId ? storedLocations[i].id + 1 : this.nextUniqueId;
    }
    return storedLocations;
  }

  private setStoredLocations(storedLocations: Array<Location>): void {
    localStorage.setItem(this.localStorageId, JSON.stringify(storedLocations));
  }

  private updateCurrentLocation(): void {
    this.mapService.getLocation(this.currentLatitude, this.currentLongitude).subscribe((response) => {
      if (response.status === google.maps.GeocoderStatus.OK && response.results[0] !== void 0) {
        this.currentLocation = response.results[0].formatted_address;
      } else {
        this.toastrService.error('uh oh');
      }
    }, (error) => {
      this.toastrService.error(error);
    });
  }
}
