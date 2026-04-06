import { MathService } from './MathService';

describe('MathService', () => {
    let mathService: MathService;

    beforeEach(() => {
        mathService = new MathService();
    });


    describe('divide', () => {
        it('should divide two positive numbers', () => {
            expect(mathService.divide(10, 2)).toBe(5);
            expect(mathService.divide(20, 10)).toBe(2);
        });

        it('should divide two negative numbers', () => {
            expect(mathService.divide(-10, -2)).toBe(5);
            expect(mathService.divide(-20, -10)).toBe(2);
        });

        it('should divide a positive and a negative number', () => {
            expect(mathService.divide(10, -2)).toBe(-5);
            expect(mathService.divide(-10, 2)).toBe(-5);
        });

        it('should throw an error when dividing by zero', () => {
            expect(() => mathService.divide(10, 0)).toThrowError('Division by zero');
            expect(() => mathService.divide(0, 0)).toThrowError('Division by zero');
        });

        it('should divide zero by a number', () => {
            expect(mathService.divide(0, 10)).toBe(0);
            expect(mathService.divide(0, -10)).toBe(0);
        });
    });

    describe('isPowerOfTwo', () => {
        it('should return true for powers of two', () => {
            expect(mathService.isPowerOfTwo(1)).toBe(true);
            expect(mathService.isPowerOfTwo(2)).toBe(true);
            expect(mathService.isPowerOfTwo(4)).toBe(true);
            expect(mathService.isPowerOfTwo(8)).toBe(true);
            expect(mathService.isPowerOfTwo(16)).toBe(true);
        });

        it('should return false for non-powers of two', () => {
            expect(mathService.isPowerOfTwo(3)).toBe(false);
            expect(mathService.isPowerOfTwo(5)).toBe(false);
            expect(mathService.isPowerOfTwo(6)).toBe(false);
            expect(mathService.isPowerOfTwo(7)).toBe(false);
            expect(mathService.isPowerOfTwo(9)).toBe(false);
        });

        it('should return false for zero and negative numbers', () => {
            expect(mathService.isPowerOfTwo(0)).toBe(false);
            expect(mathService.isPowerOfTwo(-1)).toBe(false);
            expect(mathService.isPowerOfTwo(-2)).toBe(false);
            expect(mathService.isPowerOfTwo(-4)).toBe(false);
            expect(mathService.isPowerOfTwo(-8)).toBe(false);
        });
    });
});