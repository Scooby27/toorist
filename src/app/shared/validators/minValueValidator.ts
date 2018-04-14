import { FormControl } from '@angular/forms';

export default function minValueValidator (value, isEqualTo: boolean, object?: Object) {
    return (formControl: FormControl) => {
        const minValue = getMinValueFromObject(value, object);

        let propertyToBeCompared = '';
        if (typeof value === 'string') {
            propertyToBeCompared = 'property [' + value + '] with value:';
        }

        let error = 'Value must be greater than or equal to ' + propertyToBeCompared + minValue.toString();
        let result = Number(formControl.value) < minValue ? { [error]: { valid: false } } : null;
        if (!isEqualTo) {
            error = 'Value must be greater than ' + propertyToBeCompared + minValue.toString();
            result = Number(formControl.value) <= minValue ? { [error]: { valid: false } } : null;
        }
        return result;
    };
}

function getMinValueFromObject (value, object?: Object): Number {
    let minValue = value;
    if (typeof value === 'string') {
        const keys = Object.keys(object);
        let isLowerLevelProperty = true;
        for (let i = 0; i < keys.length; i++) {
            if (value === keys[i]) {
                isLowerLevelProperty = false;
                minValue = object[value];
            }
        }
        if (isLowerLevelProperty) {
            minValue = getMinValueFromLowerLevelObject(value, object, keys);
        }
    }
    return minValue;
}

function getMinValueFromLowerLevelObject (value: string, object: Object, keys: Array<string>): number {
    let minValue: number = null;
    for (let i = 0; i < keys.length; i++) {
        if (typeof object[keys[i]] === 'object') {
            for (const property in object[keys[i]]) {
                if (value === property) {
                    minValue = object[keys[i]][property];
                }
            }
        }
    }
    return minValue;
}
