import { Component, Input, EventEmitter, Output } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

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
  bsModalRef: BsModalRef;

  constructor (private modalService: BsModalService) {}

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  edit(): void {
    this.bsModalRef = this.modalService.show(LocationModalComponent);
    const modal = (<LocationModalComponent>this.bsModalRef.content);
    modal.title = 'Edit Location';
    modal.submitLabel = 'Submit';
    modal.setLocation(this.location);
    modal.addLocationEmitter.subscribe((location: Location) => {
      this.location = {...this.location, ...location};
      this.updateLocationEmitter.emit(this.location);
      this.bsModalRef.hide();
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
