const dateUtils = require('./dateUtils');

describe('dateUtils', () => {
    describe('formatDate', () => {
        it('should return "NaN-NaN-NaN" for null or undefined input', () => {
            expect(dateUtils.formatDate(null)).toBe("NaN-NaN-NaN");
            expect(dateUtils.formatDate(undefined)).toBe("NaN-NaN-NaN");
        });

        it('should return "NaN-NaN-NaN" for invalid date input', () => {
            expect(dateUtils.formatDate('invalid date')).toBe("NaN-NaN-NaN");
        });

        it('should format date correctly', () => {
            const date = new Date('2022-01-01');
            expect(dateUtils.formatDate(date)).toBe("2022-01-01");
        });
    });

    describe('getDaysInMonth', () => {
        it('should return correct number of days for February in a leap year', () => {
            expect(dateUtils.getDaysInMonth(2, 2020)).toBe(29);
        });

        it('should return correct number of days for February in a non-leap year', () => {
            expect(dateUtils.getDaysInMonth(2, 2021)).toBe(28);
        });

        it('should return correct number of days for other months', () => {
            expect(dateUtils.getDaysInMonth(1, 2022)).toBe(31);
            expect(dateUtils.getDaysInMonth(3, 2022)).toBe(31);
            expect(dateUtils.getDaysInMonth(4, 2022)).toBe(30);
        });
    });

    describe('isLeapYear', () => {
        it('should return true for leap years', () => {
            expect(dateUtils.isLeapYear(2020)).toBe(true);
            expect(dateUtils.isLeapYear(2000)).toBe(true);
        });

        it('should return false for non-leap years', () => {
            expect(dateUtils.isLeapYear(2021)).toBe(false);
            expect(dateUtils.isLeapYear(1999)).toBe(false);
        });
    });

    describe('getFiscalYear', () => {
        it('should return correct fiscal year', () => {
            const date = new Date('2022-01-01');
            expect(dateUtils.getFiscalYear(date)).toBe(2021);
            const date2 = new Date('2022-04-01');
            expect(dateUtils.getFiscalYear(date2)).toBe(2022);
        });
    });
});