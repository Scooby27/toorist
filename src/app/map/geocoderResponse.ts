/// <reference types="googlemaps" />

export interface GeocoderResponse {
    results: Array<google.maps.GeocoderResult>;
    status: google.maps.GeocoderStatus;
}
