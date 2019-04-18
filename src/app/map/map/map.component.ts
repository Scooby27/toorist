import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ModalController, Platform, ToastController } from '@ionic/angular';
import { Location } from '../location';
import { LocationService } from '../location.service';
import { MapStyles } from '../mapStyles';
import { LocationModalComponent } from '../modals/location-modal/location-modal.component';

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
  zoom = 2;
  currentLocationObtained = false;
  styles = MapStyles.orange;
  headerHeight = document.getElementById('header').offsetHeight;

  constructor(
    private locationService: LocationService,
    private modalController: ModalController,
    private toastController: ToastController,
    private geolocation: Geolocation,
    private platform: Platform
  ) {
  }

  ngOnInit(): void {
    this.platform.ready().then(() => {
      this.locations = this.locationService.getStoredLocations();
      this.loadCurrentLocation();
    });
  }

  goToCurrentLocation(): void {
    this.latitude = this.currentLatitude;
    this.longitude = this.currentLongitude;
    this.zoom = 8;
  }

  async addLocation(): Promise<void> {
    const locationModal = await this.modalController.create({
      component: LocationModalComponent,
      componentProps: { title: 'Add Location', submitLabel: 'Add' }
    });
    locationModal.present();
    locationModal.onWillDismiss().then(detail => {
      const location = detail.data;
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
        });
      }
    });
  }

  updateZoom(zoom: number): void {
    this.zoom = zoom;
  }

  private loadCurrentLocation(): void {
    this.geolocation.watchPosition().subscribe(position => {
      this.currentLocationObtained = true;
      this.currentLatitude = position.coords.latitude;
      this.currentLongitude = position.coords.longitude;
      this.updateCurrentLocation();
    });
  }

  private updateCurrentLocation(): void {
    this.locationService.getLocation(this.currentLatitude, this.currentLongitude).subscribe(response => {
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
      }).then(toast => toast.present());
    });
  }
}
