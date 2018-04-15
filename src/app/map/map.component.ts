import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { MapService } from './map.service';
import { Location } from './location';
import { AddLocationModalComponent } from './add-location-modal/add-location-modal.component';

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

  private zoom: number;

  constructor(private mapService: MapService, private toastrService: ToastrService, private modalService: BsModalService) {
  }

  ngOnInit(): void {
    this.zoom = 8;
    this.locations = this.getStoredLocations();
  }

  loadCurrentLocation(): void {
    this.loading = true;
    navigator.geolocation.watchPosition((position: Position) => {
      this.loading = false;
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      this.currentLatitude = position.coords.latitude;
      this.currentLongitude = position.coords.longitude;
      this.getCurrentCountry();
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
      this.locations.push(location);
      this.setStoredLocations(this.locations);
      this.toastrService.success(location.city + ' has been added to your visited locations!');
    });
  }

  private getStoredLocations(): Array<Location> {
    const storedLocations = localStorage.getItem(this.localStorageId);
    return storedLocations === null ? [] : JSON.parse(storedLocations);
  }

  private setStoredLocations(storedLocations: Array<Location>): void {
    localStorage.setItem(this.localStorageId, JSON.stringify(storedLocations));
  }

  private getCurrentCountry (): void {
    this.mapService.getCountry(this.currentLatitude, this.currentLongitude).subscribe((response) => {
      if (response.status === google.maps.GeocoderStatus.OK && response.results[0] !== void 0) {
        this.currentLocation = response.results[0].formatted_address;
        this.toastrService.success('Location set.');
      }
    }, (error) => {
      this.toastrService.error(error);
    });
  }
}
