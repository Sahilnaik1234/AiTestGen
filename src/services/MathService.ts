export class MathService {
    add(a: number, b: number): number {
        return a + b;
    }

    subtract(a: number, b: number): number {
        return a - b;
    }

    multiply(a: number, b: number): number {
        return a * b;
    }

    divide(a: number, b: number): number {
        if (b === 0) {
            throw new Error('Division by zero');
        }
        return a / b;
    }

    isPowerOfTwo(n: number): boolean {
        if (n <= 0) return false;
        return (n & (n - 1)) === 0;
    }

    factorial(n: number): number {
        if (n < 0) throw new Error('Negative factorial');
        if (n === 0) return 1;
        return n * this.factorial(n - 1);
    }
}
