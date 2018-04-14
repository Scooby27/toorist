import { FormControl } from '@angular/forms';

import maxValueValidator from './maxValueValidator';

describe('Maximum Value Validator', () => {
    let validator: Function;

    beforeEach( () => {
        validator = maxValueValidator;
    });

    it('maxValueValidator throws error if integer input is greater than max value', () => {
        const maxValue = 6;
        const testValue = 7;
        const testValidator = validator(maxValue, true);
        const result = { 'Value must be less than or equal to 6': { valid: false } };
        expect(testValidator(new FormControl(testValue))).toEqual(result);
    });

    it('maxValueValidator does not throw error if integer input is less than max value', () => {
        const maxValue = 10;
        const testValue = 4;
        const testValidator = validator(maxValue, true);
        expect(testValidator(new FormControl(testValue))).toBe(null);
    });

    it('maxValueValidator does not throw error if integer input equals the max value', () => {
        const maxValue = 4;
        const testValue = maxValue;
        const testValidator = validator(maxValue, true);
        expect(testValidator(new FormControl(testValue))).toBe(null);
    });

    it('maxValueValidator throws error if decimal input is greater than max value', () => {
        const maxValue = 5;
        const testValue = 6.5;
        const testValidator = validator(maxValue, true);
        const result = {'Value must be less than or equal to 5': { valid: false } };
        expect(testValidator(new FormControl(testValue))).toEqual(result);
    });

    it('maxValueValidator does not throw error if decimal input is less than max value', () => {
        const maxValue = 5;
        const testValue = 3.3;
        const testValidator = validator(maxValue, true);
        expect(testValidator(new FormControl(testValue))).toBe(null);
    });

    it('maxValueValidator does not throw error if decimal input equals the max value', () => {
        const maxValue = 7.83;
        const testValue = maxValue;
        const testValidator = validator(maxValue, true);
        expect(testValidator(new FormControl(testValue))).toBe(null);
    });

    it('maxValueValidator throws error if integer input is greater than decimal max value', () => {
        const maxValue = 6.6;
        const testValue = 7;
        const testValidator = validator(maxValue, true);
        const result = { 'Value must be less than or equal to 6.6': { valid: false } };
        expect(testValidator(new FormControl(testValue))).toEqual(result);
    });

    it('maxValueValidator does not throw error if integer input is less than the decimal max value', () => {
        const maxValue = 7.83;
        const testValue = 7;
        const testValidator = validator(maxValue, true);
        expect(testValidator(new FormControl(testValue))).toBe(null);
    });

    it('maxValueValidator throws error if negative input is greater than the negative max value', () => {
        const maxValue = -7.5;
        const testValue = -1;
        const testValidator = validator(maxValue, true);
        const result = { 'Value must be less than or equal to -7.5': { valid: false } };
        expect(testValidator(new FormControl(testValue))).toEqual(result);
    });

    it('maxValueValidator does not throw error if negative input is less than the negative max value', () => {
        const maxValue = -5;
        const testValue = -10.245;
        const testValidator = validator(maxValue, true);
        expect(testValidator(new FormControl(testValue))).toBe(null);
    });

    it('maxValueValidator does not throw error if negative input is less than the negative max value', () => {
        const maxValue = -5;
        const testValue = -10.245;
        const testValidator = validator(maxValue, true);
        expect(testValidator(new FormControl(testValue))).toBe(null);
    });

    it('maxValueValidator throws error if is not equal to but value is equal', () => {
        const maxValue = 2;
        const testValue = 2;
        const testValidator = validator(maxValue, false);
        const result = { 'Value must be less than 2': { valid: false } };
        expect(testValidator(new FormControl(testValue))).toEqual(result);
    });

    it('maxValueValidator does not throw error if is equal to and value is equal', () => {
        const maxValue = 2;
        const testValue = 2;
        const testValidator = validator(maxValue, true);
        const result = null;
        expect(testValidator(new FormControl(testValue))).toEqual(result);
    });

    it('maxValueValidator handles object input', () => {
        const testValue = 2;
        const input = {quantity: 1};
        const testValidator = validator('quantity', true, input);
        const result = {'Value must be less than or equal to property [quantity] with value:1': { valid: false }};
        expect(testValidator(new FormControl(testValue))).toEqual(result);
    });

    it('maxValueValidator handles lower level object input', () => {
        const testValue = 2;
        const input = {object: {quantity: 1}};
        const testValidator = validator('quantity', true, input);
        const result = {'Value must be less than or equal to property [quantity] with value:1': { valid: false }};
        expect(testValidator(new FormControl(testValue))).toEqual(result);
    });

});
