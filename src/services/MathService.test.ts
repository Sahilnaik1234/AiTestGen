import { MathService } from './MathService';

describe('MathService', () => {
    let mathService: MathService;

    beforeEach(() => {
        mathService = new MathService();
    });

    describe('add', () => {
        it('should return the sum of two positive numbers', () => {
            expect(mathService.add(1, 2)).toBe(3);
            expect(mathService.add(5, 7)).toBe(12);
        });

        it('should return the sum of two negative numbers', () => {
            expect(mathService.add(-1, -2)).toBe(-3);
            expect(mathService.add(-5, -7)).toBe(-12);
        });

        it('should return the sum of a positive and a negative number', () => {
            expect(mathService.add(1, -2)).toBe(-1);
            expect(mathService.add(-5, 7)).toBe(2);
        });

        it('should return the sum of two decimal numbers', () => {
            expect(mathService.add(1.5, 2.7)).toBeCloseTo(4.2);
            expect(mathService.add(-1.5, -2.7)).toBeCloseTo(-4.2);
        });

        it('should return the sum of a number and zero', () => {
            expect(mathService.add(1, 0)).toBe(1);
            expect(mathService.add(-1, 0)).toBe(-1);
        });
    });

    describe('subtract', () => {
        it('should return the difference of two positive numbers', () => {
            expect(mathService.subtract(5, 2)).toBe(3);
            expect(mathService.subtract(10, 7)).toBe(3);
        });

        it('should return the difference of two negative numbers', () => {
            expect(mathService.subtract(-5, -2)).toBe(-3);
            expect(mathService.subtract(-10, -7)).toBe(-3);
        });

        it('should return the difference of a positive and a negative number', () => {
            expect(mathService.subtract(5, -2)).toBe(7);
            expect(mathService.subtract(-5, 2)).toBe(-7);
        });

        it('should return the difference of two decimal numbers', () => {
            expect(mathService.subtract(5.5, 2.7)).toBeCloseTo(2.8);
            expect(mathService.subtract(-5.5, -2.7)).toBeCloseTo(-2.8);
        });

        it('should return the difference of a number and zero', () => {
            expect(mathService.subtract(5, 0)).toBe(5);
            expect(mathService.subtract(-5, 0)).toBe(-5);
        });
    });

    describe('multiply', () => {
        it('should return the product of two positive numbers', () => {
            expect(mathService.multiply(2, 3)).toBe(6);
            expect(mathService.multiply(5, 7)).toBe(35);
        });

        it('should return the product of two negative numbers', () => {
            expect(mathService.multiply(-2, -3)).toBe(6);
            expect(mathService.multiply(-5, -7)).toBe(35);
        });

        it('should return the product of a positive and a negative number', () => {
            expect(mathService.multiply(2, -3)).toBe(-6);
            expect(mathService.multiply(-5, 7)).toBe(-35);
        });

        it('should return the product of two decimal numbers', () => {
            expect(mathService.multiply(2.5, 3.7)).toBeCloseTo(9.25);
            expect(mathService.multiply(-2.5, -3.7)).toBeCloseTo(9.25);
        });

        it('should return the product of a number and zero', () => {
            expect(mathService.multiply(5, 0)).toBe(0);
            expect(mathService.multiply(-5, 0)).toBe(0);
        });
    });

    describe('divide', () => {
        it('should return the quotient of two positive numbers', () => {
            expect(mathService.divide(10, 2)).toBe(5);
            expect(mathService.divide(15, 3)).toBe(5);
        });

        it('should return the quotient of two negative numbers', () => {
            expect(mathService.divide(-10, -2)).toBe(5);
            expect(mathService.divide(-15, -3)).toBe(5);
        });

        it('should return the quotient of a positive and a negative number', () => {
            expect(mathService.divide(10, -2)).toBe(-5);
            expect(mathService.divide(-15, 3)).toBe(-5);
        });

        it('should return the quotient of two decimal numbers', () => {
            expect(mathService.divide(10.5, 2.1)).toBeCloseTo(5);
            expect(mathService.divide(-10.5, -2.1)).toBeCloseTo(5);
        });

        it('should throw an error when dividing by zero', () => {
            expect(() => mathService.divide(10, 0)).toThrowError('Division by zero');
            expect(() => mathService.divide(-10, 0)).toThrowError('Division by zero');
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

        it('should return false for negative numbers and zero', () => {
            expect(mathService.isPowerOfTwo(0)).toBe(false);
            expect(mathService.isPowerOfTwo(-1)).toBe(false);
            expect(mathService.isPowerOfTwo(-2)).toBe(false);
            expect(mathService.isPowerOfTwo(-4)).toBe(false);
            expect(mathService.isPowerOfTwo(-8)).toBe(false);
        });
    });

    describe('factorial', () => {
        it('should return the factorial of a positive number', () => {
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