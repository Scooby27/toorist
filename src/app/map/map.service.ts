import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GeocoderResponse } from './geocoderResponse';


@Injectable()
export class MapService {
    constructor(private http: HttpClient) {

    }

    getCountry(latitude: number, longitude: number): Observable<GeocoderResponse> {
        return this.http.get<GeocoderResponse>('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude);
    }
}
