import { MathService } from './MathService';

describe('MathService', () => {
    let mathService: MathService;

    beforeEach(() => {
        mathService = new MathService();
    });



    describe('multiply', () => {
        it('should multiply two positive numbers', () => {
            const result = mathService.multiply(2, 3);
            expect(result).toBe(6);
        });

        it('should multiply two negative numbers', () => {
            const result = mathService.multiply(-2, -3);
            expect(result).toBe(6);
        });

        it('should multiply a positive and a negative number', () => {
            const result = mathService.multiply(2, -3);
            expect(result).toBe(-6);
        });

        it('should multiply zero with a number', () => {
            const result = mathService.multiply(2, 0);
            expect(result).toBe(0);
        });
    });

    describe('divide', () => {
        it('should divide two positive numbers', () => {
            const result = mathService.divide(6, 3);
            expect(result).toBe(2);
        });

        it('should divide two negative numbers', () => {
            const result = mathService.divide(-6, -3);
            expect(result).toBe(2);
        });

        it('should divide a positive and a negative number', () => {
            const result = mathService.divide(6, -3);
            expect(result).toBe(-2);
        });

        it('should throw an error when dividing by zero', () => {
            expect(() => mathService.divide(6, 0)).toThrowError('Division by zero');
        });
    });

    describe('isPowerOfTwo', () => {
        it('should return true for powers of two', () => {
            expect(mathService.isPowerOfTwo(1)).toBe(true);
            expect(mathService.isPowerOfTwo(2)).toBe(true);
            expect(mathService.isPowerOfTwo(4)).toBe(true);
            expect(mathService.isPowerOfTwo(8)).toBe(true);
        });

        it('should return false for non-powers of two', () => {
            expect(mathService.isPowerOfTwo(3)).toBe(false);
            expect(mathService.isPowerOfTwo(5)).toBe(false);
            expect(mathService.isPowerOfTwo(6)).toBe(false);
            expect(mathService.isPowerOfTwo(7)).toBe(false);
        });

        it('should return false for negative numbers', () => {
            expect(mathService.isPowerOfTwo(-1)).toBe(false);
            expect(mathService.isPowerOfTwo(-2)).toBe(false);
            expect(mathService.isPowerOfTwo(-4)).toBe(false);
            expect(mathService.isPowerOfTwo(-8)).toBe(false);
        });

        it('should return false for zero', () => {
            expect(mathService.isPowerOfTwo(0)).toBe(false);
        });
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