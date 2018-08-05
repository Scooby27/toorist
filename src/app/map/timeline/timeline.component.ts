import { Component, OnInit } from '@angular/core';

import { LocationService } from '../location.service';
import { Location } from '../location';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
  locations: Array<Location> = [];

  constructor(private locationService: LocationService) { }

  ngOnInit(): void {
    this.locations = this.locationService.getStoredLocations().sort(this.sortByStartDate);
  }

  displayDate(location: Location): string {
    const startDate = new Date(location.startDateMilliseconds);
    const endDate = new Date(location.endDateMilliseconds);
    const startYear = startDate.getFullYear();
    const endYear = endDate.getFullYear();
    let result = startDate.toLocaleString('en-GB', { month: 'short' });
    if (startYear !== endYear) {
      result += ', ' + startYear;
    }
    result += ' - ' + endDate.toLocaleString('en-GB', { month: 'short' }) + ', ' + endYear;
    return result;
  }

  private sortByStartDate(locA: Location, locB: Location): number {
    return locA.startDateMilliseconds >= locB.startDateMilliseconds ? 1 : -1;
  }
}
