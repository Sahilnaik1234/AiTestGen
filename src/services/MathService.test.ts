import { MathService } from './MathService';

describe('MathService', () => {
    let mathService: MathService;

    beforeEach(() => {
        mathService = new MathService();
    });

    describe('factorial', () => {
        it('should calculate the factorial of a positive number', () => {
            expect(mathService.factorial(0)).toBe(1);
            expect(mathService.factorial(1)).toBe(1);
            expect(mathService.factorial(2)).toBe(2);
            expect(mathService.factorial(3)).toBe(6);
            expect(mathService.factorial(4)).toBe(24);
            expect(mathService.factorial(5)).toBe(120);
        });

        it('should throw an error for negative numbers', () => {
            expect(() => mathService.factorial(-1)).toThrowError('Negative factorial');
            expect(() => mathService.factorial(-2)).toThrowError('Negative factorial');
            expect(() => mathService.factorial(-3)).toThrowError('Negative factorial');
        });
    });
});