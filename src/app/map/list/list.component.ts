import { Component, OnInit } from '@angular/core';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';

import { Location } from '../location';
import { LocationService } from '../location.service';
import { LocationModalComponent } from '../modals/location-modal/location-modal.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  locations: Array<Location>;

  constructor(private modalCtrl: ModalController, private toastController: ToastController, private locationService: LocationService) { }

  ngOnInit(): void {
    this.locations = this.locationService.getStoredLocations();
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
        const successToast = this.toastController.create({
          message: location.city + ' has been added to your visited locations! Keep adding more!',
          position: 'top'
        });
        successToast.present();
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
          this.locationService.setStoredLocations(this.locations);
          this.toastController.create({message: 'Your trip to ' + location.city + ' has been updated!'}).present();
          break;
        }
      }
    }
  }

  private deleteLocation(location: Location): void {
    for (let i = 0; i < this.locations.length; i++) {
      if (this.locations[i].id === location.id) {
        this.locations.splice(i, 1);
        this.locationService.setStoredLocations(this.locations);
        this.toastController.create({message: location.city + ' has been deleted.'}).present();
        break;
      }
    }
  }

}
