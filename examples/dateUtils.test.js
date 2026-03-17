import { 
    formatDate, 
    getDaysInMonth, 
    isLeapYear, 
    addDays, 
    diffDays, 
    getStartOfWeek, 
    getEndOfWeek, 
    formatRelativeTime, 
    isValidDate, 
    convertToTimezone, 
    getQuarter, 
    isWeekend, 
    getFiscalYear 
} from './dateUtils';

describe('dateUtils', () => {
    describe('formatDate', () => {
        it('should return NaN-NaN-NaN for invalid dates', () => {
            expect(formatDate(null)).toBe('NaN-NaN-NaN');
            expect(formatDate(undefined)).toBe('NaN-NaN-NaN');
            expect(formatDate('')).toBe('NaN-NaN-NaN');
            expect(formatDate('abc')).toBe('NaN-NaN-NaN');
        });

        it('should format valid dates correctly', () => {
            expect(formatDate('2022-01-01')).toBe('2022-01-01');
            expect(formatDate('2022-12-31')).toBe('2022-12-31');
            expect(formatDate(new Date('2022-01-01'))).toBe('2022-01-01');
            expect(formatDate(new Date('2022-12-31'))).toBe('2022-12-31');
        });
    });

    describe('getDaysInMonth', () => {
        it('should return the correct number of days in a month', () => {
            expect(getDaysInMonth(0, 2022)).toBe(31); // January
            expect(getDaysInMonth(1, 2022)).toBe(28); // February
            expect(getDaysInMonth(2, 2022)).toBe(31); // March
            expect(getDaysInMonth(3, 2022)).toBe(30); // April
            expect(getDaysInMonth(4, 2022)).toBe(31); // May
            expect(getDaysInMonth(5, 2022)).toBe(30); // June
            expect(getDaysInMonth(6, 2022)).toBe(31); // July
            expect(getDaysInMonth(7, 2022)).toBe(31); // August
            expect(getDaysInMonth(8, 2022)).toBe(30); // September
            expect(getDaysInMonth(9, 2022)).toBe(31); // October
            expect(getDaysInMonth(10, 2022)).toBe(30); // November
            expect(getDaysInMonth(11, 2022)).toBe(31); // December
        });

        it('should return the correct number of days in a leap year', () => {
            expect(getDaysInMonth(1, 2020)).toBe(29); // February in a leap year
        });
    });

    describe('isLeapYear', () => {
        it('should return true for leap years', () => {
            expect(isLeapYear(2020)).toBe(true);
            expect(isLeapYear(2000)).toBe(true);
            expect(isLeapYear(1996)).toBe(true);
        });

        it('should return false for non-leap years', () => {
            expect(isLeapYear(2022)).toBe(false);
            expect(isLeapYear(2019)).toBe(false);
            expect(isLeapYear(2018)).toBe(false);
        });
    });

    describe('addDays', () => {
        it('should add days to a date correctly', () => {
            const date = new Date('2022-01-01');
            expect(addDays(date, 1).toISOString()).toBe(new Date('2022-01-02').toISOString());
            expect(addDays(date, 2).toISOString()).toBe(new Date('2022-01-03').toISOString());
            expect(addDays(date, 30).toISOString()).toBe(new Date('2022-01-31').toISOString());
        });
    });

    describe('diffDays', () => {
        it('should return the correct difference in days between two dates', () => {
            const date1 = new Date('2022-01-01');
            const date2 = new Date('2022-01-02');
            expect(diffDays(date1, date2)).toBe(1);
            expect(diffDays(date2, date1)).toBe(1);
            expect(diffDays(date1, date1)).toBe(0);
        });
    });

    describe('getStartOfWeek', () => {
        it('should return the start of the week for a given date', () => {
            const date = new Date('2022-01-03');
            expect(getStartOfWeek(date).toISOString()).toBe(new Date('2022-01-02').toISOString()); // Sunday
            const date2 = new Date('2022-01-01');
            expect(getStartOfWeek(date2).toISOString()).toBe(new Date('2021-12-26').toISOString()); // Sunday
        });
    });

    describe('getEndOfWeek', () => {
        it('should return the end of the week for a given date', () => {
            const date = new Date('2022-01-03');
            expect(getEndOfWeek(date).toISOString()).toBe(new Date('2022-01-08').toISOString()); // Saturday
            const date2 = new Date('2022-01-01');
            expect(getEndOfWeek(date2).toISOString()).toBe(new Date('2022-01-01').toISOString()); // Saturday
        });
    });

    describe('formatRelativeTime', () => {
        it('should return the correct relative time for a given date', () => {
            const now = new Date();
            const date = new Date(now.getTime() - 1000 * 60 * 60 * 24); // yesterday
            expect(formatRelativeTime(date)).toBe('1 days ago');
            const date2 = new Date(now.getTime() - 1000 * 60 * 60); // 1 hour ago
            expect(formatRelativeTime(date2)).toBe('1 hours ago');
            const date3 = new Date(now.getTime() - 1000 * 60); // 1 minute ago
            expect(formatRelativeTime(date3)).toBe('1 minutes ago');
            const date4 = new Date(now.getTime() - 1000); // 1 second ago
            expect(formatRelativeTime(date4)).toBe('Just now');
        });
    });

    describe('isValidDate', () => {
        it('should return true for valid dates', () => {
            expect(isValidDate('2022-01-01')).toBe(true);
            expect(isValidDate(new Date('2022-01-01'))).toBe(true);
        });

        it('should return false for invalid dates', () => {
            expect(isValidDate(null)).toBe(false);
            expect(isValidDate(undefined)).toBe(false);
            expect(isValidDate('')).toBe(false);
            expect(isValidDate('abc')).toBe(false);
        });
    });

    describe('convertToTimezone', () => {
        it('should convert a date to a given timezone', () => {
            const date = new Date('2022-01-01');
            const tz = 'America/New_York';
            const convertedDate = convertToTimezone(date, tz);
            expect(convertedDate.getTimezoneOffset()).not.toBe(date.getTimezoneOffset());
        });
    });

    describe('getQuarter', () => {
        it('should return the correct quarter for a given date', () => {
            const date = new Date('2022-01-01');
            expect(getQuarter(date)).toBe(1);
            const date2 = new Date('2022-04-01');
            expect(getQuarter(date2)).toBe(2);
            const date3 = new Date('2022-07-01');
            expect(getQuarter(date3)).toBe(3);
            const date4 = new Date('2022-10-01');
            expect(getQuarter(date4)).toBe(4);
        });
    });

    describe('isWeekend', () => {
        it('should return true for weekends', () => {
            const date = new Date('2022-01-01'); // Saturday
            expect(isWeekend(date)).toBe(true);
            const date2 = new Date('2022-01-02'); // Sunday
            expect(isWeekend(date2)).toBe(true);
        });

        it('should return false for weekdays', () => {
            const date = new Date('2022-01-03'); // Monday
            expect(isWeekend(date)).toBe(false);
            const date2 = new Date('2022-01-04'); // Tuesday
            expect(isWeekend(date2)).toBe(false);
        });
    });

    describe('addDays', () => {
        it('should add days correctly', () => {
            const date = new Date('2022-01-01');
            const newDate = dateUtils.addDays(date, 10);
            expect(newDate.toISOString().split('T')[0]).toBe("2022-01-11");
        });
    });


    describe('getEndOfWeek', () => {
        it('should return end of week correctly', () => {
            const date = new Date('2022-01-05');
            const endOfWeek = dateUtils.getEndOfWeek(date);
            expect(endOfWeek.toISOString().split('T')[0]).toBe("2022-01-09");
        });
    });

    describe('formatRelativeTime', () => {
        it('should format relative time correctly', () => {
            const date = new Date();
            date.setSeconds(date.getSeconds() - 10);
            expect(dateUtils.formatRelativeTime(date)).toBe("Just now");
        });

        it('should format relative time correctly for minutes', () => {
            const date = new Date();
            date.setMinutes(date.getMinutes() - 10);
            expect(dateUtils.formatRelativeTime(date)).toBe("10 minutes ago");
        });

        it('should format relative time correctly for hours', () => {
            const date = new Date();
            date.setHours(date.getHours() - 10);
            expect(dateUtils.formatRelativeTime(date)).toBe("10 hours ago");
        });

        it('should format relative time correctly for days', () => {
            const date = new Date();
            date.setDate(date.getDate() - 10);
            expect(dateUtils.formatRelativeTime(date)).toBe("10 days ago");
        });
    });

    describe('isValidDate', () => {
        it('should return true for valid dates', () => {
            const date = new Date('2022-01-01');
            expect(dateUtils.isValidDate(date)).toBe(true);
        });

        it('should return false for invalid dates', () => {
            const date = new Date('invalid date');
            expect(dateUtils.isValidDate(date)).toBe(false);
        });
    });

    describe('convertToTimezone', () => {
        it('should convert timezone correctly', () => {
            const date = new Date('2022-01-01');
            const tzDate = dateUtils.convertToTimezone(date, 'America/New_York');
            expect(tzDate.toISOString().split('T')[0]).toBe("2021-12-31");
        });
    });

    describe('getQuarter', () => {
        it('should return correct quarter', () => {
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
            expect(getFiscalYear(date)).toBe(2021);
            const date2 = new Date('2022-04-01');
            expect(getFiscalYear(date2)).toBe(2022);
            const date3 = new Date('2022-07-01');
            expect(getFiscalYear(date3)).toBe(2022);
            const date4 = new Date('2022-10-01');
            expect(getFiscalYear(date4)).toBe(2022);
        });
    });
});