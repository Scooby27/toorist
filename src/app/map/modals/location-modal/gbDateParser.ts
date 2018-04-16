import { Injectable } from '@angular/core';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date-parser-formatter';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date-struct';
import { NgbDateStructAdapter } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date-adapter';

@Injectable()
export class GBDateParser extends NgbDateParserFormatter {
    parse(value: string): NgbDateStruct {
        let result = null;
        if (value) {
            const dateSplit = value.trim().split('/').map(Number);
            result = {year: this.ifNull(dateSplit[2]), month: this.ifNull(dateSplit[1]), day: this.ifNull(dateSplit[0])};
        }
        return result;
    }
    format(date: NgbDateStruct): string {
        let result = null;
        if (date) {
            result = this.padNumber(this.ifNull(date.day)) + '/' + this.padNumber(this.ifNull(date.month)) + '/' + this.ifNull(date.year);
        }
        return result;
    }

    private padNumber(number: string | number): string {
        const numberString = number.toString();
        return numberString.length === 1 ? '0' + numberString : numberString;
    }

    private ifNull(value: string | number): string | number {
        return value === null || value === void 0 ? '' : value;
    }
}
