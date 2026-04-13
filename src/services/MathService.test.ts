import { MathService } from './MathService';

describe('MathService', () => {
    let mathService: MathService;

    beforeEach(() => {
        mathService = new MathService();
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