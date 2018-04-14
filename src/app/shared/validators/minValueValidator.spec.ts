import { FormControl } from '@angular/forms';

import minValueValidator from './minValueValidator';

describe('minimum Value Validator', () => {
    let validator: Function;

    beforeEach( () => {
        validator = minValueValidator;
    });

    it('minValueValidator throws error if integer input is less than min value', () => {
        const minValue = 6;
        const testValue = 5;
        const testValidator = validator(minValue, true);
        const result = { 'Value must be greater than or equal to 6': { valid: false } };
        expect(testValidator(new FormControl(testValue))).toEqual(result);
    });

    it('minValueValidator does not throw error if integer input is greater than min value', () => {
        const minValue = 10;
        const testValue = 14;
        const testValidator = validator(minValue, true);
        expect(testValidator(new FormControl(testValue))).toBe(null);
    });

    it('minValueValidator does not throw error if integer input equals the min value', () => {
        const minValue = 4;
        const testValue = minValue;
        const testValidator = validator(minValue, true);
        expect(testValidator(new FormControl(testValue))).toBe(null);
    });

    it('minValueValidator throws error if decimal input is less than min value', () => {
        const minValue = 5;
        const testValue = 3.5;
        const testValidator = validator(minValue, true);
        const result = { 'Value must be greater than or equal to 5': { valid: false } };
        expect(testValidator(new FormControl(testValue))).toEqual(result);
    });

    it('minValueValidator does not throw error if decimal input is greater than min value', () => {
        const minValue = 5;
        const testValue = 7.3;
        const testValidator = validator(minValue, true);
        expect(testValidator(new FormControl(testValue))).toBe(null);
    });

    it('minValueValidator does not throw error if decimal input equals the min value', () => {
        const minValue = 7.83;
        const testValue = minValue;
        const testValidator = validator(minValue, true);
        expect(testValidator(new FormControl(testValue))).toBe(null);
    });

    it('minValueValidator throws error if integer input is less than decimal min value', () => {
        const minValue = 6.6;
        const testValue = 6;
        const testValidator = validator(minValue, true);
        const result = {'Value must be greater than or equal to 6.6': { valid: false } };
        expect(testValidator(new FormControl(testValue))).toEqual(result);
    });

    it('minValueValidator does not throw error if integer input is greater than the decimal min value', () => {
        const minValue = 7.83;
        const testValue = 9;
        const testValidator = validator(minValue, true);
        expect(testValidator(new FormControl(testValue))).toBe(null);
    });

    it('minValueValidator throws error if negative input is less than the negative min value', () => {
        const minValue = -7.5;
        const testValue = -12;
        const testValidator = validator(minValue, true);
        const result = { 'Value must be greater than or equal to -7.5': { valid: false } };
        expect(testValidator(new FormControl(testValue))).toEqual(result);
    });

    it('minValueValidator does not throw error if negative input is greater than the negative min value', () => {
        const minValue = -5;
        const testValue = -2.245;
        const testValidator = validator(minValue, true);
        expect(testValidator(new FormControl(testValue))).toBe(null);
    });

    it('minValueValidator throws error if is not equal to but value is equal', () => {
        const minValue = 2;
        const testValue = 2;
        const testValidator = validator(minValue, false);
        const result = { 'Value must be greater than 2': { valid: false } };
        expect(testValidator(new FormControl(testValue))).toEqual(result);
    });

    it('minValueValidator does not throw error if is equal to and value is equal', () => {
        const minValue = 2;
        const testValue = 2;
        const testValidator = validator(minValue, true);
        const result = null;
        expect(testValidator(new FormControl(testValue))).toEqual(result);
    });

    it('minValueValidator handles object input', () => {
        const testValue = 2;
        const input = {quantity: 3};
        const testValidator = validator('quantity', true, input);
        const result = {'Value must be greater than or equal to property [quantity] with value:3': { valid: false }};
        expect(testValidator(new FormControl(testValue))).toEqual(result);
    });

    it('minValueValidator handles lower level object input', () => {
        const testValue = 2;
        const input = {object: {quantity: 3}};
        const testValidator = validator('quantity', true, input);
        const result = {'Value must be greater than or equal to property [quantity] with value:3': { valid: false }};
        expect(testValidator(new FormControl(testValue))).toEqual(result);
    });
});
