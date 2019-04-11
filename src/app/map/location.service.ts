import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeocoderResponse } from './geocoderResponse';
import { Location } from './location';



@Injectable()
export class LocationService {
    private localStorageId = 'toorist-locations';
    private nextUniqueId = 0;

    constructor(private http: HttpClient) {

    }

    getLocation(latitude: number, longitude: number): Observable<GeocoderResponse> {
        return this.http.get<GeocoderResponse>('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude);
    }

    getStoredLocations(): Array<Location> {
        let storedLocations = JSON.parse(localStorage.getItem(this.localStorageId));
        storedLocations = storedLocations === null ? [] : storedLocations;
        for (let i = 0; i < storedLocations.length; i++) {
            this.nextUniqueId = storedLocations[i].id >= this.nextUniqueId ? storedLocations[i].id + 1 : this.nextUniqueId;
        }
        return storedLocations;
    }

    setStoredLocations(storedLocations: Array<Location>): void {
        localStorage.setItem(this.localStorageId, JSON.stringify(storedLocations));
    }

    getNextUniqueId(): number {
        return this.nextUniqueId++;
    }
}
