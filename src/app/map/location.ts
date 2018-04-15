import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date-struct';

export class Location {
    id: number;
    latitude: number;
    longitude: number;
    city: string;
    countryName: string;
    countryCode: string;
    currency: string;
    startDateMilliseconds: number;
    endDateMilliseconds: number;
    deleted: boolean;
    selected: boolean;
}
