const dateUtils = require('./dateUtils');

describe('dateUtils', () => {
    describe('formatDate', () => {
        it('should return "NaN-NaN-NaN" for null or undefined input', () => {
            expect(dateUtils.formatDate(null)).toBe('NaN-NaN-NaN');
            expect(dateUtils.formatDate(undefined)).toBe('NaN-NaN-NaN');
        });

        it('should return "NaN-NaN-NaN" for invalid date input', () => {
            expect(dateUtils.formatDate('invalid date')).toBe('NaN-NaN-NaN');
        });

        it('should return the formatted date for valid date input', () => {
            const date = new Date('2022-01-01');
            expect(dateUtils.formatDate(date)).toBe('2022-01-01');
        });
    });

    describe('getDaysInMonth', () => {
        it('should return the correct number of days in a month', () => {
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

        it('should return the correct number of days in a leap year February', () => {
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
    });

    describe('diffDays', () => {
        it('should return the correct difference in days between two dates', () => {
            const date1 = new Date('2022-01-01');
            const date2 = new Date('2022-01-11');
            expect(dateUtils.diffDays(date1, date2)).toBe(10);
        });
    });

    describe('getStartOfWeek', () => {
        it('should return the start of the week for a given date', () => {
            const date = new Date('2022-01-05'); // Wednesday
            const startOfWeek = dateUtils.getStartOfWeek(date);
            expect(startOfWeek.toISOString().split('T')[0]).toBe('2022-01-03'); // Monday
        });
    });

    describe('getEndOfWeek', () => {
        it('should return the end of the week for a given date', () => {
            const date = new Date('2022-01-05'); // Wednesday
            const endOfWeek = dateUtils.getEndOfWeek(date);
            expect(endOfWeek.toISOString().split('T')[0]).toBe('2022-01-09'); // Sunday
        });
    });

    describe('formatRelativeTime', () => {
        it('should return "Just now" for a date in the same second', () => {
            const date = new Date();
            expect(dateUtils.formatRelativeTime(date)).toBe('Just now');
        });

        it('should return the correct relative time for a date in the past', () => {
            const date = new Date();
            date.setSeconds(date.getSeconds() - 10);
            expect(dateUtils.formatRelativeTime(date)).toBe('10 seconds ago');
        });

        it('should return the correct relative time for a date in the past (minutes)', () => {
            const date = new Date();
            date.setMinutes(date.getMinutes() - 10);
            expect(dateUtils.formatRelativeTime(date)).toBe('10 minutes ago');
        });

        it('should return the correct relative time for a date in the past (hours)', () => {
            const date = new Date();
            date.setHours(date.getHours() - 10);
            expect(dateUtils.formatRelativeTime(date)).toBe('10 hours ago');
        });

        it('should return the correct relative time for a date in the past (days)', () => {
            const date = new Date();
            date.setDate(date.getDate() - 10);
            expect(dateUtils.formatRelativeTime(date)).toBe('10 days ago');
        });
    });

    describe('isValidDate', () => {
        it('should return true for a valid date', () => {
            const date = new Date('2022-01-01');
            expect(dateUtils.isValidDate(date)).toBe(true);
        });

        it('should return false for an invalid date', () => {
            const date = new Date('invalid date');
            expect(dateUtils.isValidDate(date)).toBe(false);
        });
    });

    describe('convertToTimezone', () => {
        it('should convert a date to a different timezone', () => {
            const date = new Date('2022-01-01');
            const tzDate = dateUtils.convertToTimezone(date, 'America/New_York');
            expect(tzDate.toISOString().split('T')[0]).toBe('2021-12-31'); // UTC-5
        });
    });

    describe('getQuarter', () => {
        it('should return the correct quarter for a given date', () => {
            const date = new Date('2022-01-01');
            expect(dateUtils.getQuarter(date)).toBe(1); // Q1
            const date2 = new Date('2022-04-01');
            expect(dateUtils.getQuarter(date2)).toBe(2); // Q2
            const date3 = new Date('2022-07-01');
            expect(dateUtils.getQuarter(date3)).toBe(3); // Q3
            const date4 = new Date('2022-10-01');
            expect(dateUtils.getQuarter(date4)).toBe(4); // Q4
        });
    });

    describe('isWeekend', () => {
        it('should return true for a weekend day', () => {
            const date = new Date('2022-01-01'); // Saturday
            expect(dateUtils.isWeekend(date)).toBe(true);
            const date2 = new Date('2022-01-02'); // Sunday
            expect(dateUtils.isWeekend(date2)).toBe(true);
        });

        it('should return false for a weekday', () => {
            const date = new Date('2022-01-03'); // Monday
            expect(dateUtils.isWeekend(date)).toBe(false);
        });
    });

    describe('getFiscalYear', () => {
        it('should return the correct fiscal year for a given date', () => {
            const date = new Date('2022-01-01');
            expect(dateUtils.getFiscalYear(date)).toBe(2021); // Fiscal year starts in April
            const date2 = new Date('2022-04-01');
            expect(dateUtils.getFiscalYear(date2)).toBe(2022); // Fiscal year starts in April
        });
    });
});