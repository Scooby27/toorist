import { FormControl } from '@angular/forms';

export default function maxValueValidator (value, isEqualTo: boolean, object?: Object) {
    return (formControl: FormControl) => {
        const maxValue = getMaxValueFromObject(value, object);
        let propertyToBeCompared = '';

        if (typeof value === 'string') {
            propertyToBeCompared = 'property [' + value + '] with value:';
        }


        let error = 'Value must be less than or equal to ' + propertyToBeCompared + maxValue.toString();
        let result = Number(formControl.value) > maxValue ? { [error]: { valid: false } } : null;
        if (!isEqualTo) {
            error = 'Value must be less than ' + propertyToBeCompared + maxValue.toString();
            result = Number(formControl.value) >= maxValue ? { [error]: { valid: false } } : null;
        }
        return result;
    };
}

function getMaxValueFromObject (value, object?: Object): number {
    let maxValue = value;
    if (typeof value === 'string') {
        const keys = Object.keys(object);
        let isLowerLevelProperty = true;
        for (let i = 0; i < keys.length; i++) {
            if (value === keys[i]) {
                isLowerLevelProperty = false;
                maxValue = object[value];
            }
        }
        if (isLowerLevelProperty) {
            maxValue = getMaxValueFromLowerLevelObject(value, object, keys);
        }
    }
    return maxValue;
}

function getMaxValueFromLowerLevelObject (value: string, object: Object, keys: Array<string>): number {
    let maxValue: number = null;
    for (let i = 0; i < keys.length; i++) {
        if (typeof object[keys[i]] === 'object') {
            for (const property in object[keys[i]]) {
                if (value === property) {
                    maxValue = object[keys[i]][property];
                }
            }
        }
    }
    return maxValue;
}
