import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Location } from '../location';
import { LocationModalComponent } from '../modals/location-modal/location-modal.component';


@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent {
  @Input() location: Location;
  @Output() updateLocationEmitter = new EventEmitter<Location>();
  isCollapsed = true;

  constructor(private modalController: ModalController) {
  }

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  async edit(): Promise<void> {
    const locationModal = await this.modalController.create({
      component: LocationModalComponent,
      componentProps: { title: 'Edit Location', submitLabel: 'Submit', initialLocation: this.location }
    });
    locationModal.present();
    locationModal.onWillDismiss().then(detail => {
      const location = detail.data;
      if (location !== void 0) {
        this.location = {...this.location, ...location};
        this.updateLocationEmitter.emit(this.location);
      }
    });
  }

  deleteLocation(): void {
    this.location.deleted = true;
    this.updateLocationEmitter.emit(this.location);
  }

  totalDays(): number {
    return Math.ceil((this.location.endDateMilliseconds - this.location.startDateMilliseconds) / (1000 * 60 * 60 * 24));
  }

}
