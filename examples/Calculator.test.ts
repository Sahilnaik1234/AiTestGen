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
    describe('Trigonometric Functions', () => {
        it('should calculate the sine of an angle', () => {
            expect(calculator.sin(Math.PI / 2)).toBe(1);
        });

        it('should calculate the cosine of an angle', () => {
            expect(calculator.cos(0)).toBe(1);
        });

        it('should calculate the tangent of an angle', () => {
            expect(calculator.tan(Math.PI / 4)).toBe(1);
        });

        it('should calculate the arcsine of a number', () => {
            expect(calculator.asin(1)).toBe(Math.PI / 2);
        });

        it('should calculate the arccosine of a number', () => {
            expect(calculator.acos(1)).toBe(0);
        });

        it('should calculate the arctangent of a number', () => {
            expect(calculator.atan(1)).toBe(Math.PI / 4);
        });

        it('should calculate the hyperbolic sine of a number', () => {
            expect(calculator.sinh(0)).toBe(0);
        });

        it('should calculate the hyperbolic cosine of a number', () => {
            expect(calculator.cosh(0)).toBe(1);
        });

        it('should calculate the hyperbolic tangent of a number', () => {
            expect(calculator.tanh(0)).toBe(0);
        });
    });

    // Rounding and Comparison
    describe('Rounding and Comparison', () => {
        it('should calculate the ceiling of a number', () => {
            expect(calculator.ceil(4.7)).toBe(5);
        });

        it('should calculate the floor of a number', () => {
            expect(calculator.floor(4.7)).toBe(4);
        });

        it('should calculate the round of a number', () => {
            expect(calculator.round(4.7)).toBe(5);
        });

        it('should calculate the truncation of a number', () => {
            expect(calculator.trunc(4.7)).toBe(4);
        });

        it('should calculate the maximum of two numbers', () => {
            expect(calculator.max(5, 10)).toBe(10);
        });

        it('should calculate the minimum of two numbers', () => {
            expect(calculator.min(5, 10)).toBe(5);
        });
    });

    // Statistics
    describe('Statistics', () => {
        it('should calculate the mean of an array of numbers', () => {
            expect(calculator.mean([1, 2, 3, 4, 5])).toBe(3);
        });

        it('should calculate the median of an array of numbers', () => {
            expect(calculator.median([1, 2, 3, 4, 5])).toBe(3);
        });

        it('should calculate the variance of an array of numbers', () => {
            expect(calculator.variance([1, 2, 3, 4, 5])).toBe(2);
        });

        it('should calculate the standard deviation of an array of numbers', () => {
            expect(calculator.standardDeviation([1, 2, 3, 4, 5])).toBeCloseTo(1.4142135623730951);
        });

        it('should calculate the sum of an array of numbers', () => {
            expect(calculator.sum([1, 2, 3, 4, 5])).toBe(15);
        });

        it('should calculate the product of an array of numbers', () => {
            expect(calculator.product([1, 2, 3, 4, 5])).toBe(120);
        });

        it('should calculate the factorial of a number', () => {
            expect(calculator.factorial(5)).toBe(120);
        });

        it('should throw an error when calculating the factorial of a negative number', () => {
            expect(() => calculator.factorial(-5)).toThrowError('Factorial of negative number');
        });
    });

    // Advanced Formulas
    describe('Advanced Formulas', () => {
        it('should calculate the fibonacci of a number', () => {
            expect(calculator.fibonacci(10)).toBe(55);
        });

        it('should throw an error when calculating the fibonacci of a negative number', () => {
            expect(() => calculator.fibonacci(-5)).toThrowError('Fibonacci of negative number');
        });

        it('should check if a number is prime', () => {
            expect(calculator.isPrime(7)).toBe(true);
        });

        it('should calculate the greatest common divisor of two numbers', () => {
            expect(calculator.gcd(12, 15)).toBe(3);
        });

        it('should calculate the least common multiple of two numbers', () => {
            expect(calculator.lcm(12, 15)).toBe(60);
        });
    });

    // Matrix Operations
    describe('Matrix Operations', () => {
        it('should add two matrices', () => {
            const matrix1 = [[1, 2], [3, 4]];
            const matrix2 = [[5, 6], [7, 8]];
            expect(calculator.matrixAdd(matrix1, matrix2)).toEqual([[6, 8], [10, 12]]);
        });

        it('should throw an error when adding two matrices with different dimensions', () => {
            const matrix1 = [[1, 2], [3, 4]];
            const matrix2 = [[5, 6], [7, 8], [9, 10]];
            expect(() => calculator.matrixAdd(matrix1, matrix2)).toThrowError('Matrix dimensions must match');
        });

        it('should multiply two matrices', () => {
            const matrix1 = [[1, 2], [3, 4]];
            const matrix2 = [[5, 6], [7, 8]];
            expect(calculator.matrixMultiply(matrix1, matrix2)).toEqual([[19, 22], [43, 50]]);
        });

        it('should throw an error when multiplying two matrices with invalid dimensions', () => {
            const matrix1 = [[1, 2], [3, 4]];
            const matrix2 = [[5, 6]];
            expect(() => calculator.matrixMultiply(matrix1, matrix2)).toThrowError('Invalid dimensions for multiplication');
        });
    });

    // Financial Calculations
    describe('Financial Calculations', () => {
        it('should calculate the compound interest', () => {
            expect(calculator.compoundInterest(1000, 0.05, 5, 1)).toBeCloseTo(1276.78);
        });

        it('should calculate the present value', () => {
            expect(calculator.presentValue(1000, 0.05, 5)).toBeCloseTo(783.53);
        });

        it('should calculate the future value', () => {
            expect(calculator.futureValue(1000, 0.05, 5)).toBeCloseTo(1276.78);
        });
    });

    // Geometric Calculations
    describe('Geometric Calculations', () => {
        it('should calculate the area of a circle', () => {
            expect(calculator.circleArea(5)).toBeCloseTo(78.54);
        });

        it('should calculate the circumference of a circle', () => {
            expect(calculator.circleCircumference(5)).toBeCloseTo(31.42);
        });

        it('should calculate the area of a rectangle', () => {
            expect(calculator.rectangleArea(4, 5)).toBe(20);
        });

        it('should calculate the area of a triangle', () => {
            expect(calculator.triangleArea(3, 4)).toBe(6);
        });

        it('should calculate the volume of a sphere', () => {
            expect(calculator.sphereVolume(5)).toBeCloseTo(523.6);
        });

        it('should calculate the volume of a cylinder', () => {
            expect(calculator.cylinderVolume(5, 10)).toBeCloseTo(785.4);
        });
    });

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