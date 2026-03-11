const dateUtils = require('./dateUtils');

describe('dateUtils', () => {
    describe('formatDate', () => {
        it('should return NaN-NaN-NaN for invalid dates', () => {
            expect(dateUtils.formatDate(null)).toBe('NaN-NaN-NaN');
            expect(dateUtils.formatDate(undefined)).toBe('NaN-NaN-NaN');
            expect(dateUtils.formatDate('')).toBe('NaN-NaN-NaN');
            expect(dateUtils.formatDate('invalid')).toBe('NaN-NaN-NaN');
        });

        it('should format valid dates correctly', () => {
            const date = new Date('2022-01-01');
            expect(dateUtils.formatDate(date)).toBe('2022-01-01');
            expect(dateUtils.formatDate('2022-01-01')).toBe('2022-01-01');
            expect(dateUtils.formatDate('2022/01/01')).toBe('2022-01-01');
        });
    });

    describe('getDaysInMonth', () => {
        it('should return the correct number of days for each month', () => {
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

        it('should return the correct number of days for leap years', () => {
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
        it('should add the correct number of days to a date', () => {
            const date = new Date('2022-01-01');
            const newDate = dateUtils.addDays(date, 10);
            expect(newDate.toISOString().split('T')[0]).toBe('2022-01-11');
        });

        it('should handle edge cases correctly', () => {
            const date = new Date('2022-01-31');
            const newDate = dateUtils.addDays(date, 1);
            expect(newDate.toISOString().split('T')[0]).toBe('2022-02-01');
        });
    });

    describe('diffDays', () => {
        it('should return the correct number of days between two dates', () => {
            const date1 = new Date('2022-01-01');
            const date2 = new Date('2022-01-10');
            expect(dateUtils.diffDays(date1, date2)).toBe(9);
        });

        it('should handle edge cases correctly', () => {
            const date1 = new Date('2022-01-31');
            const date2 = new Date('2022-02-01');
            expect(dateUtils.diffDays(date1, date2)).toBe(1);
        });
    });

    describe('getStartOfWeek', () => {
        it('should return the start of the week for a given date', () => {
            const date = new Date('2022-01-03');
            const startOfWeek = dateUtils.getStartOfWeek(date);
            expect(startOfWeek.toISOString().split('T')[0]).toBe('2022-01-02');
        });

        it('should handle edge cases correctly', () => {
            const date = new Date('2022-01-01');
            const startOfWeek = dateUtils.getStartOfWeek(date);
            expect(startOfWeek.toISOString().split('T')[0]).toBe('2021-12-26');
        });
    });

    describe('getEndOfWeek', () => {
        it('should return the end of the week for a given date', () => {
            const date = new Date('2022-01-03');
            const endOfWeek = dateUtils.getEndOfWeek(date);
            expect(endOfWeek.toISOString().split('T')[0]).toBe('2022-01-08');
        });

        it('should handle edge cases correctly', () => {
            const date = new Date('2022-01-01');
            const endOfWeek = dateUtils.getEndOfWeek(date);
            expect(endOfWeek.toISOString().split('T')[0]).toBe('2022-01-01');
        });
    });

    describe('formatRelativeTime', () => {
        it('should return the correct relative time for a given date', () => {
            const date = new Date('2022-01-01');
            const relativeTime = dateUtils.formatRelativeTime(date);
            expect(relativeTime).toBe('Just now');
        });

        it('should handle edge cases correctly', () => {
            const date = new Date('2022-01-01T00:00:00.000Z');
            const relativeTime = dateUtils.formatRelativeTime(date);
            expect(relativeTime).toBe('Just now');
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
        it('should convert a date to a given timezone', () => {
            const date = new Date('2022-01-01');
            const tz = 'America/New_York';
            const convertedDate = dateUtils.convertToTimezone(date, tz);
            expect(convertedDate.getTimezoneOffset()).not.toBe(date.getTimezoneOffset());
        });
    });

    describe('getQuarter', () => {
        it('should return the correct quarter for a given date', () => {
            const date = new Date('2022-01-01');
            expect(dateUtils.getQuarter(date)).toBe(1);
            const date2 = new Date('2022-04-01');
            expect(dateUtils.getQuarter(date2)).toBe(2);
            const date3 = new Date('2022-07-01');
            expect(dateUtils.getQuarter(date3)).toBe(3);
            const date4 = new Date('2022-10-01');
            expect(dateUtils.getQuarter(date4)).toBe(4);
        });
    });

    describe('isWeekend', () => {
        it('should return true for weekends', () => {
            const date = new Date('2022-01-01');
            expect(dateUtils.isWeekend(date)).toBe(true);
            const date2 = new Date('2022-01-02');
            expect(dateUtils.isWeekend(date2)).toBe(false);
            const date3 = new Date('2022-01-08');
            expect(dateUtils.isWeekend(date3)).toBe(true);
        });
    });

    describe('getFiscalYear', () => {
        it('should return the correct fiscal year for a given date', () => {
            const date = new Date('2022-01-01');
            expect(dateUtils.getFiscalYear(date)).toBe(2021);
            const date2 = new Date('2022-04-01');
            expect(dateUtils.getFiscalYear(date2)).toBe(2022);
        });
    });
});