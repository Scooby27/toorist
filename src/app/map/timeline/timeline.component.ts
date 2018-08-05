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

  private sortByStartDate(locA: Location, locB: Location): number {
    return locA.startDateMilliseconds >= locB.startDateMilliseconds ? 1 : -1;
  }
