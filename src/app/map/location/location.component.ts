import { Component, Input, EventEmitter, Output } from '@angular/core';

import { Location } from '../location';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent {
  @Input() location: Location;
  @Output() updateLocationEmitter = new EventEmitter<Location>();
  isCollapsed = true;

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  deleteLocation(): void {
    this.location.deleted = true;
    this.updateLocationEmitter.emit(this.location);
  }

}
