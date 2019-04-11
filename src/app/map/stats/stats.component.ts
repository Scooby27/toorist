import { AfterViewInit, Component } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Location } from '../location';
import { LocationService } from '../location.service';
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

  async addLocation(): Promise<void> {
    const locationModal = await this.modalCtrl.create({
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
        }).then(toast => toast.present());
        this.drawMap();
      }
    });
  }

  private resizeChart(): void {
    const chartContainer = document.getElementById('chartContainer');
    const footer = document.getElementById('footer');
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
      const data = google.visualization.arrayToDataTable([
        ['Region code', 'Continent', 'Countries Visited', 'Cities Visited'],
        [
          '142',
          'Asia',
          {
            v: this.getNumberOfVisitedCountriesInContinent('Asia') / this.countriesPerContinent.asia,
            f: this.getNumberOfVisitedCountriesInContinent('Asia') + ' / ' + this.countriesPerContinent.asia
          },
          this.getNumberOfVisitedCitiesInContinent('Asia')
        ],
        [
          '002',
          'Africa',
          {
            v: this.getNumberOfVisitedCountriesInContinent('Africa') / this.countriesPerContinent.africa,
            f: this.getNumberOfVisitedCountriesInContinent('Africa') + ' / ' + this.countriesPerContinent.africa
          },
          this.getNumberOfVisitedCitiesInContinent('Africa')
        ],
        [
          '150',
          'Europe',
          {
            v: this.getNumberOfVisitedCountriesInContinent('Europe') / this.countriesPerContinent.europe,
            f: this.getNumberOfVisitedCountriesInContinent('Europe') + ' / ' + this.countriesPerContinent.europe
          },
          this.getNumberOfVisitedCitiesInContinent('Europe')
        ],
        [
          '009',
          'Australia',
          {
            v: this.getNumberOfVisitedCountriesInContinent('Australia') / this.countriesPerContinent.australia,
            f: this.getNumberOfVisitedCountriesInContinent('Australia') + ' / ' + this.countriesPerContinent.australia
          },
          this.getNumberOfVisitedCitiesInContinent('Australia')
        ],
        [
          '019',
          'Americas',
          {
            v: this.getNumberOfVisitedCountriesInContinent('Americas') / this.countriesPerContinent.americas,
            f: this.getNumberOfVisitedCountriesInContinent('Americas') + ' / ' + this.countriesPerContinent.americas
          },
          this.getNumberOfVisitedCitiesInContinent('Americas')
        ]
      ]);

      const options = {
        resolution: 'continents',
        colorAxis: {
          colors: ['#FFF6E5', '#FFA500']
        },
        enableRegionInteractivity: true,
        magnifyingGlass: {
          enable: true,
          zoomFactor: 100
        },
        legend: 'none'
      };
      const chart = new google.visualization.GeoChart(document.getElementById('regions_div'));
      chart.draw(data, options);
    };

    google.charts.setOnLoadCallback(drawRegionsMap);
  }

  private getNumberOfVisitedCitiesInContinent(continent: string): number {
    const continentUpperCase = continent.toUpperCase().substring(0, continent.length - 1);
    const cities = this.locations.filter(l => l.continent.toUpperCase().includes(continentUpperCase)).map(l => l.city.toUpperCase());
    return cities.filter((city, index) => cities.indexOf(city) === index).length;
  }

  private getNumberOfVisitedCountriesInContinent(continent: string): number {
    const continentUpperCase = continent.toUpperCase().substring(0, continent.length - 1);
    return this.locations.filter((location, index) =>
      location.continent.toUpperCase().includes(continentUpperCase) &&
      this.locations.map(l => l.countryCode).indexOf(location.countryCode) === index
    ).length;
  }
}
