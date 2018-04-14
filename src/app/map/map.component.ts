import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

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

  private zoom: number;
  private zoomScales: {[zoom: number]: number};

  constructor(private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    this.zoom = 8;
    this.zoomScales = {
      20: 1128.497220,
      19: 2256.994440,
      18: 4513.988880,
      17: 9027.977761,
      16: 18055.955520,
      15: 36111.911040,
      14: 72223.822090,
      13: 144447.644200,
      12: 288895.288400,
      11: 577790.576700,
      10: 1155581.153000,
      9: 2311162.307000,
      8: 4622324.614000,
      7: 9244649.227000,
      6: 18489298.450000,
      5: 36978596.910000,
      4: 73957193.820000,
      3: 147914387.600000,
      2: 295828775.300000,
      1: 591657550.500000
    };
  }

  loadCurrentLocation(): void {
    navigator.geolocation.getCurrentPosition((position: Position) => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      this.currentLatitude = position.coords.latitude;
      this.currentLongitude = position.coords.longitude;
    }, (error: PositionError) => {
      this.toastrService.error(error.message);
    },
      { timeout: 10000, maximumAge: 75000 });
  }

  setZoom(zoom: number): void {
    this.zoom = zoom;
  }

  currentLocationRadius(): number {
    const p = Math.pow(2, (21 - this.zoom));
    return p * 1128.497220 * 0.0027;
  }
}
