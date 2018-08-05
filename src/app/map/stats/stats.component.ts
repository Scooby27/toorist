import { Component, AfterViewInit } from '@angular/core';
import { LatLngLiteral } from '@agm/core/map-types';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';

import { LocationService } from '../location.service';
import { Location } from '../location';
import { LocationModalComponent } from '../modals/location-modal/location-modal.component';

declare var google: any;

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})

export class StatsComponent implements AfterViewInit {
  locations: Array<Location>;

  private countriesPerContinent = {
    africa: 59,
    asia: 55,
    europe: 56,
    americas: 53,
    australia: 25
  };

  constructor(
    private locationService: LocationService,
    private modalCtrl: ModalController,
    private toastController: ToastController) {
  }

  ngAfterViewInit(): void {
    this.resizeChart();
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
      }
    });
  }

  private resizeChart(): void {
    const chartContainer = document.getElementById('chartContainer');
    const footer =  document.getElementById('footer');
    chartContainer.style.height = chartContainer.offsetHeight - footer.offsetHeight + 'px';
  }

  private loadLocations(): void {
    this.locations = this.locationService.getStoredLocations();
  }

  private drawMap(): void {
    google.charts.load('current', {
      packages: ['geochart'],
      mapsApiKey: 'AIzaSyCN0d30qHE_S9CkDarkURUAzis4L1Tfzfw'
    });

    const drawRegionsMap = () => {
      const countries: Array<string> = [];
      const data = google.visualization.arrayToDataTable([
        ['Region code', 'Continent', 'Countries Visited', 'Cities Visited'],
        ['142', 'Asia', this.getNumberOfVisitedCountriesInContinent('Asia'), this.getNumberOfVisitedCitiesInContinent('Asia')],
        ['002', 'Africa', this.getNumberOfVisitedCountriesInContinent('Africa'), this.getNumberOfVisitedCitiesInContinent('Africa')],
        ['150', 'Europe', this.getNumberOfVisitedCountriesInContinent('Europe'), this.getNumberOfVisitedCitiesInContinent('Europe')],
        ['009', 'Australia', this.getNumberOfVisitedCountriesInContinent('Australia'),
        this.getNumberOfVisitedCitiesInContinent('Australia')],
        ['019', 'Americas', this.getNumberOfVisitedCountriesInContinent('Americas'), this.getNumberOfVisitedCitiesInContinent('Americas')]
      ]);

      const options = { resolution: 'continents', colorAxis: {colors: ['#FFF6E5', '#FFA500']} };
      const chart = new google.visualization.GeoChart(document.getElementById('regions_div'));
      chart.draw(data, options);
    };

    google.charts.setOnLoadCallback(drawRegionsMap);
  }

  private getNumberOfVisitedCitiesInContinent(continent: string): number {
    const continentUpperCase = continent.toUpperCase().substring(0, continent.length - 1);
    const cities = this.locations.filter(l => l.continent.toUpperCase().includes(continentUpperCase)).map( l => l.city.toUpperCase());
    return cities.filter( (city, index) => cities.indexOf(city) === index).length;
  }

  private getNumberOfVisitedCountriesInContinent(continent: string): number {
    const continentUpperCase = continent.toUpperCase().substring(0, continent.length - 1);
    return this.locations.filter((location, index) =>
      location.continent.toUpperCase().includes(continentUpperCase) &&
      this.locations.map(l => l.countryCode).indexOf(location.countryCode) === index
    ).length;
  }
}
