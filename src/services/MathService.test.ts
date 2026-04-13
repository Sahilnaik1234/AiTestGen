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

    describe('add', () => {
        it('should add two positive numbers', () => {
            expect(mathService.add(1, 2)).toBe(3);
            expect(mathService.add(10, 20)).toBe(30);
        });

        it('should add two negative numbers', () => {
            expect(mathService.add(-1, -2)).toBe(-3);
            expect(mathService.add(-10, -20)).toBe(-30);
        });

        it('should add a positive and a negative number', () => {
            expect(mathService.add(1, -2)).toBe(-1);
            expect(mathService.add(-10, 20)).toBe(10);
        });

        it('should add a number and zero', () => {
            expect(mathService.add(1, 0)).toBe(1);
            expect(mathService.add(0, 10)).toBe(10);
        });
    });

    describe('subtract', () => {
        it('should subtract two positive numbers', () => {
            expect(mathService.subtract(10, 2)).toBe(8);
            expect(mathService.subtract(20, 10)).toBe(10);
        });

        it('should subtract two negative numbers', () => {
            expect(mathService.subtract(-10, -2)).toBe(-8);
            expect(mathService.subtract(-20, -10)).toBe(-10);
        });

        it('should subtract a positive and a negative number', () => {
            expect(mathService.subtract(1, -2)).toBe(3);
            expect(mathService.subtract(-10, 20)).toBe(-30);
        });

        it('should subtract a number and zero', () => {
            expect(mathService.subtract(1, 0)).toBe(1);
            expect(mathService.subtract(0, 10)).toBe(-10);
        });
    });

    describe('multiply', () => {
        it('should multiply two positive numbers', () => {
            expect(mathService.multiply(1, 2)).toBe(2);
            expect(mathService.multiply(10, 20)).toBe(200);
        });

        it('should multiply two negative numbers', () => {
            expect(mathService.multiply(-1, -2)).toBe(2);
            expect(mathService.multiply(-10, -20)).toBe(200);
        });

        it('should multiply a positive and a negative number', () => {
            expect(mathService.multiply(1, -2)).toBe(-2);
            expect(mathService.multiply(-10, 20)).toBe(-200);
        });

        it('should multiply a number and zero', () => {
            expect(mathService.multiply(1, 0)).toBe(0);
            expect(mathService.multiply(0, 10)).toBe(0);
        });
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
            expect(mathService.divide(1, -2)).toBe(-0.5);
            expect(mathService.divide(-10, 20)).toBe(-0.5);
        });

        it('should throw an error when dividing by zero', () => {
            expect(() => mathService.divide(10, 0)).toThrowError('Division by zero');
            expect(() => mathService.divide(0, 0)).toThrowError('Division by zero');
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
});