const dateUtils = require('./dateUtils');

describe('dateUtils', () => {
    describe('formatDate', () => {
        it('should return "NaN-NaN-NaN" for invalid date', () => {
            expect(dateUtils.formatDate(null)).toBe("NaN-NaN-NaN");
            expect(dateUtils.formatDate(undefined)).toBe("NaN-NaN-NaN");
            expect(dateUtils.formatDate('')).toBe("NaN-NaN-NaN");
            expect(dateUtils.formatDate('invalid')).toBe("NaN-NaN-NaN");
        });

        it('should format date correctly', () => {
            const date = new Date('2022-01-01');
            expect(dateUtils.formatDate(date)).toBe('2022-01-01');
        });

        it('should handle edge cases', () => {
            const date = new Date('2022-12-31');
            expect(dateUtils.formatDate(date)).toBe('2022-12-31');
        });
    });

    describe('getDaysInMonth', () => {
        it('should return correct number of days for each month', () => {
            expect(dateUtils.getDaysInMonth(0, 2022)).toBe(31); // January
            expect(dateUtils.getDaysInMonth(1, 2022)).toBe(28); // February
            expect(dateUtils.getDaysInMonth(2, 2022)).toBe(31); // March
            expect(dateUtils.getDaysInMonth(3, 2022)).toBe(30); // April
            expect(dateUtils.getDaysInMonth(4, 2022)).toBe(31); // May
            expect(dateUtils.getDaysInMonth(5, 2022)).toBe(30); // June
            expect(dateUtils.getDaysInMonth(6, 2022)).toBe(31); // July
            expect(dateUtils.getDaysInMonth(7, 2022)).toBe(31); // August
            expect(dateUtils.getDaysInMonth(8, 2022)).toBe(30); // September
            expect(dateUtils.getDaysInMonth(9, 2022)).toBe(31); // October
            expect(dateUtils.getDaysInMonth(10, 2022)).toBe(30); // November
            expect(dateUtils.getDaysInMonth(11, 2022)).toBe(31); // December
        });

        it('should handle leap year', () => {
            expect(dateUtils.getDaysInMonth(1, 2020)).toBe(29); // February in a leap year
        });
    });

    describe('isLeapYear', () => {
        it('should return true for leap years', () => {
            expect(dateUtils.isLeapYear(2020)).toBe(true);
            expect(dateUtils.isLeapYear(2000)).toBe(true);
        });

        it('should return false for non-leap years', () => {
            expect(dateUtils.isLeapYear(2022)).toBe(false);
            expect(dateUtils.isLeapYear(1999)).toBe(false);
        });
    });

    describe('addDays', () => {
        it('should add days correctly', () => {
            const date = new Date('2022-01-01');
            const newDate = dateUtils.addDays(date, 10);
            expect(newDate.toISOString().split('T')[0]).toBe('2022-01-11');
        });

        it('should handle edge cases', () => {
            const date = new Date('2022-12-31');
            const newDate = dateUtils.addDays(date, 1);
            expect(newDate.toISOString().split('T')[0]).toBe('2023-01-01');
        });
    });

    describe('diffDays', () => {
        it('should return correct difference in days', () => {
            const date1 = new Date('2022-01-01');
            const date2 = new Date('2022-01-10');
            expect(dateUtils.diffDays(date1, date2)).toBe(9);
        });

        it('should handle edge cases', () => {
            const date1 = new Date('2022-12-31');
            const date2 = new Date('2023-01-01');
            expect(dateUtils.diffDays(date1, date2)).toBe(1);
        });
    });

    describe('getStartOfWeek', () => {
        it('should return start of week correctly', () => {
            const date = new Date('2022-01-05');
            const startOfWeek = dateUtils.getStartOfWeek(date);
            expect(startOfWeek.toISOString().split('T')[0]).toBe('2022-01-03');
        });

        it('should handle edge cases', () => {
            const date = new Date('2022-01-01');
            const startOfWeek = dateUtils.getStartOfWeek(date);
            expect(startOfWeek.toISOString().split('T')[0]).toBe('2021-12-27');
        });
    });

    describe('getEndOfWeek', () => {
        it('should return end of week correctly', () => {
            const date = new Date('2022-01-05');
            const endOfWeek = dateUtils.getEndOfWeek(date);
            expect(endOfWeek.toISOString().split('T')[0]).toBe('2022-01-09');
        });

        it('should handle edge cases', () => {
            const date = new Date('2022-01-01');
            const endOfWeek = dateUtils.getEndOfWeek(date);
            expect(endOfWeek.toISOString().split('T')[0]).toBe('2022-01-02');
        });
    });

    describe('formatRelativeTime', () => {
        it('should return correct relative time', () => {
            const date = new Date('2022-01-01');
            const now = new Date('2022-01-10');
            expect(dateUtils.formatRelativeTime(date)).toBe('9 days ago');
        });

        it('should handle edge cases', () => {
            const date = new Date('2022-01-01');
            const now = new Date('2022-01-01');
            expect(dateUtils.formatRelativeTime(date)).toBe('Just now');
        });
    });

    describe('isValidDate', () => {
        it('should return true for valid dates', () => {
            const date = new Date('2022-01-01');
            expect(dateUtils.isValidDate(date)).toBe(true);
        });

        it('should return false for invalid dates', () => {
            const date = new Date('invalid');
            expect(dateUtils.isValidDate(date)).toBe(false);
        });
    });

    describe('convertToTimezone', () => {
        it('should convert to timezone correctly', () => {
            const date = new Date('2022-01-01');
            const tz = 'America/New_York';
            const convertedDate = dateUtils.convertToTimezone(date, tz);
            expect(convertedDate.toISOString().split('T')[0]).toBe('2021-12-31');
        });

        it('should handle edge cases', () => {
            const date = new Date('2022-01-01');
            const tz = 'UTC';
            const convertedDate = dateUtils.convertToTimezone(date, tz);
            expect(convertedDate.toISOString().split('T')[0]).toBe('2022-01-01');
        });
    });

    describe('getQuarter', () => {
        it('should return correct quarter', () => {
            const date = new Date('2022-01-01');
            expect(dateUtils.getQuarter(date)).toBe(1);
        });

        it('should handle edge cases', () => {
            const date = new Date('2022-12-31');
            expect(dateUtils.getQuarter(date)).toBe(4);
        });
    });

    describe('isWeekend', () => {
        it('should return true for weekends', () => {
            const date = new Date('2022-01-01');
            expect(dateUtils.isWeekend(date)).toBe(true);
        });

        it('should return false for weekdays', () => {
            const date = new Date('2022-01-03');
            expect(dateUtils.isWeekend(date)).toBe(false);
        });
    });

    describe('getFiscalYear', () => {
        it('should return correct fiscal year', () => {
            const date = new Date('2022-01-01');
            expect(dateUtils.getFiscalYear(date)).toBe(2021);
        });

        it('should handle edge cases', () => {
            const date = new Date('2022-12-31');
            expect(dateUtils.getFiscalYear(date)).toBe(2022);
        });
    });
});