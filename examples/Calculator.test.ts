import { Calculator } from './Calculator';

describe('Calculator', () => {
    let calculator: Calculator;

    beforeEach(() => {
        calculator = new Calculator();
    });

    // Basic Arithmetic
    describe('Basic Arithmetic', () => {
        it('should add two numbers', () => {
            expect(calculator.add(2, 3)).toBe(5);
        });

        it('should subtract two numbers', () => {
            expect(calculator.subtract(5, 3)).toBe(2);
        });

        it('should multiply two numbers', () => {
            expect(calculator.multiply(4, 5)).toBe(20);
        });

        it('should divide two numbers', () => {
            expect(calculator.divide(10, 2)).toBe(5);
        });

        it('should throw an error when dividing by zero', () => {
            expect(() => calculator.divide(10, 0)).toThrowError('Divide by zero');
        });

        it('should calculate the modulo of two numbers', () => {
            expect(calculator.modulo(17, 5)).toBe(2);
        });

        it('should calculate the power of two numbers', () => {
            expect(calculator.power(2, 3)).toBe(8);
        });
    });

    // Scientific Functions
    describe('Scientific Functions', () => {
        it('should calculate the absolute value of a number', () => {
            expect(calculator.abs(-5)).toBe(5);
        });

        it('should calculate the square root of a number', () => {
            expect(calculator.sqrt(16)).toBe(4);
        });

        it('should throw an error when calculating the square root of a negative number', () => {
            expect(() => calculator.sqrt(-16)).toThrowError('Negative square root');
        });

        it('should calculate the cube root of a number', () => {
            expect(calculator.cbrt(27)).toBe(3);
        });

        it('should calculate the exponential of a number', () => {
            expect(calculator.exp(2)).toBeCloseTo(7.38905609893065);
        });

        it('should calculate the natural logarithm of a number', () => {
            expect(calculator.log(10)).toBeCloseTo(2.302585092994046);
        });

        it('should throw an error when calculating the natural logarithm of a non-positive number', () => {
            expect(() => calculator.log(0)).toThrowError('Log of non-positive number');
        });

        it('should calculate the base-10 logarithm of a number', () => {
            expect(calculator.log10(100)).toBe(2);
        });

        it('should throw an error when calculating the base-10 logarithm of a non-positive number', () => {
            expect(() => calculator.log10(0)).toThrowError('Log10 of non-positive number');
        });
    });

    // Trigonometric Functions

    // Additional Methods
    describe('Additional Methods', () => {
        it('should convert degrees to radians', () => {
            expect(calculator.degToRad(180)).toBe(Math.PI);
        });

        it('should convert radians to degrees', () => {
            expect(calculator.radToDeg(Math.PI)).toBe(180);
        });

        it('should calculate the hypotenuse of a right triangle', () => {
            expect(calculator.hypotenuse(3, 4)).toBe(5);
        });

        it('should calculate the pythagorean theorem', () => {
            expect(calculator.pythagoreanTheorem(3, 4)).toBe(5);
        });

        it('should calculate the percentage of a number', () => {
            expect(calculator.percentOf(10, 100)).toBe(10);
        });

        it('should calculate the percentage change', () => {
            expect(calculator.percentageChange(100, 120)).toBe(20);
        });

        it('should calculate the combinations of two numbers', () => {
            expect(calculator.combinations(5, 3)).toBe(10);
        });

        it('should calculate the permutations of two numbers', () => {
            expect(calculator.permutations(5, 3)).toBe(60);
        });

        it('should solve a quadratic equation', () => {
            expect(calculator.quadraticSolver(1, -3, 2)).toEqual([2, 1]);
        });
    });

    // Logical Operations
    describe('Logical Operations', () => {
        it('should perform a logical AND operation', () => {
            expect(calculator.and(true, true)).toBe(true);
        });

        it('should perform a logical OR operation', () => {
            expect(calculator.or(true, false)).toBe(true);
        });

        it('should perform a logical XOR operation', () => {
            expect(calculator.xor(true, false)).toBe(true);
        });

        it('should perform a logical NOT operation', () => {
            expect(calculator.not(true)).toBe(false);
        });
    });

    // Bitwise Operations
    describe('Bitwise Operations', () => {
        it('should perform a bitwise AND operation', () => {
            expect(calculator.bitAnd(5, 3)).toBe(1);
        });

        it('should perform a bitwise OR operation', () => {
            expect(calculator.bitOr(5, 3)).toBe(7);
        });

        it('should perform a bitwise XOR operation', () => {
            expect(calculator.bitXor(5, 3)).toBe(6);
        });

        it('should perform a bitwise NOT operation', () => {
            expect(calculator.bitNot(5)).toBe(-6);
        });

        it('should perform a bitwise left shift operation', () => {
            expect(calculator.bitShiftLeft(5, 2)).toBe(20);
        });

        it('should perform a bitwise right shift operation', () => {
            expect(calculator.bitShiftRight(20, 2)).toBe(5);
        });
    });
});