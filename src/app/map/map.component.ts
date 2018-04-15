import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { MapService } from './map.service';
import { Location } from './location';
import { AddLocationModalComponent } from './modals/add-location-modal/add-location-modal.component';

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
  bsModalRef: BsModalRef;
  locations: Array<Location>;
  localStorageId = 'toorist-locations';
  zoom: number;

  private nextUniqueId = 0;

  constructor(private mapService: MapService, private toastrService: ToastrService, private modalService: BsModalService) {
  }

  ngOnInit(): void {
    this.zoom = 1;
    this.locations = this.getStoredLocations();
  }

  loadCurrentLocation(): void {
    this.loading = true;
    let userClick = true;
    navigator.geolocation.watchPosition((position: Position) => {
      this.loading = false;
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      this.currentLatitude = position.coords.latitude;
      this.currentLongitude = position.coords.longitude;
      this.getCurrentCountry();
      if (userClick) {
        this.zoom = 8;
        userClick = false;
      }
    }, (error: PositionError) => {
      this.loading = false;
      this.toastrService.error(error.message);
    },
      { timeout: 10000, maximumAge: 75000 }
    );
  }

  setZoom(zoom: number): void {
    this.zoom = zoom;
  }

  currentLocationRadius(): number {
    const p = Math.pow(2, (21 - this.zoom));
    return p * 1128.497220 * 0.0027;
  }

  addLocation(): void {
    this.bsModalRef = this.modalService.show(AddLocationModalComponent);
    const modalComponent = (<AddLocationModalComponent>this.bsModalRef.content);
    modalComponent.addLocationEmitter.subscribe((location: Location) => {
      location.id = this.nextUniqueId++;
      const oldLocations = Object.assign([], this.locations);
      oldLocations.push(location);
      oldLocations.sort((a, b) => {
        return a.city < b.city ? -1 : 1;
      });
      this.locations = Object.assign([], oldLocations);
      this.setStoredLocations(this.locations);
      this.toastrService.success(location.city + ' has been added to your visited locations!');
    });
  }

  updateLocation(location: Location): void {
    if (location.deleted) {
      this.deleteLocation(location);
    } else {
      // TODO update
    }
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
    for (let i = 0 ; i < storedLocations.length; i++) {
      this.nextUniqueId = storedLocations[i].id >= this.nextUniqueId ? storedLocations[i].id + 1 : this.nextUniqueId;
    }
    return storedLocations;
  }

  private setStoredLocations(storedLocations: Array<Location>): void {
    localStorage.setItem(this.localStorageId, JSON.stringify(storedLocations));
  }

  private getCurrentCountry (): void {
    this.mapService.getCountry(this.currentLatitude, this.currentLongitude).subscribe((response) => {
      if (response.status === google.maps.GeocoderStatus.OK && response.results[0] !== void 0) {
        this.currentLocation = response.results[0].formatted_address;
      }
    }, (error) => {
      this.toastrService.error(error);
    });
  }
}
