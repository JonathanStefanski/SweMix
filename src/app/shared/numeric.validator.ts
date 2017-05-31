import { AbstractControl, ValidatorFn } from "@angular/forms";

export class NumericValidators {

    static isGreaterThan(min: number): ValidatorFn {
        return (c: AbstractControl): { [key: string]:boolean } | null => {
            if (c.value != undefined && (isNaN(c.value) || c.value < min)) {
                return { 'isGreaterThan' : true };
            };
            return null;            
        }
    }    

    static isLesserThan(max: number): ValidatorFn {
        return (c: AbstractControl): { [key: string]:boolean } | null => {
            if (c.value != undefined && (isNaN(c.value) || c.value > max)) {
                return { 'isLesserThan' : true };
            };
            return null;            
        }
    }    

    static isBetween(min: number, max: number): ValidatorFn {
        return (c: AbstractControl): { [key: string]:boolean } | null => {
            if (c.value != undefined && (isNaN(c.value) || min > c.value || c.value > max)) {
                return { 'isBetween' : true };
            };
            return null;            
        }
    }    
}