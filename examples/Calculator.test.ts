import { Calculator } from './Calculator';

describe('Calculator', () => {
    let calculator: Calculator;

    beforeEach(() => {
        calculator = new Calculator();
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