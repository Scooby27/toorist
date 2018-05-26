import { Component, OnInit } from '@angular/core';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { LatLngLiteral } from '@agm/core/map-types';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';

import { LocationService } from '../location.service';
import { Location } from '../location';
import { LocationModalComponent } from '../modals/location-modal/location-modal.component';
import { MapStyles } from '../mapStyles';

declare var google: any;

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})

export class StatsComponent implements OnInit {
  locations: Array<Location>;

  constructor(
    private locationService: LocationService,
    private modalCtrl: ModalController,
    private toastController: ToastController,
    private geolocation: Geolocation) {
  }

  ngOnInit(): void {
    this.loadLocations();
    this.drawMap();
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
        this.toastController.create({
          message: location.city + ' has been added to your visited locations! Keep adding more!',
          position: 'top',
          duration: 3000,
          cssClass: 'toastSuccess'
        }).present();
        this.drawMap();
        this.addLocation();
      }
    });
  }

  private loadLocations(): void {
    this.locations = this.locationService.getStoredLocations();
  }

  private drawMap(): void {
    google.charts.load('current', {
      packages: ['geochart'],
      mapsApiKey: 'AIzaSyDa6c-mJ82lZPB-0HOE59WquzqStIM_DOc'
    });

    const drawRegionsMap = () => {
      const countries: Array<string> = [];
      const data = google.visualization.arrayToDataTable([
        ['Region code', 'Continent', 'Cities Visited'],
        ['142', 'Asia', this.locations.filter(l => l.continent === 'Asia').length],
        ['002', 'Africa', this.locations.filter(l => l.continent === 'Africa').length],
        ['150', 'Europe', this.locations.filter(l => l.continent === 'Europe').length],
        ['009', 'Oceania', this.locations.filter(l => l.continent === 'Oceania').length],
        ['019', 'Americas', this.locations.filter(l => l.continent === 'North America').length]
      ]);

      const options = { resolution: 'continents' };

      const chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

      chart.draw(data, options);
    };

    google.charts.setOnLoadCallback(drawRegionsMap);
  }
}
