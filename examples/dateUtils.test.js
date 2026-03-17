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
        it('should return "NaN-NaN-NaN" when date is null or undefined', () => {
            expect(formatDate(null)).toBe("NaN-NaN-NaN");
            expect(formatDate(undefined)).toBe("NaN-NaN-NaN");
        });

        it('should return "NaN-NaN-NaN" when date is invalid', () => {
            expect(formatDate('invalid date')).toBe("NaN-NaN-NaN");
        });

        it('should format date correctly', () => {
            const date = new Date('2022-01-01');
            expect(formatDate(date)).toBe('2022-01-01');
        });
    });

    describe('getDaysInMonth', () => {
        it('should return correct number of days in month', () => {
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

        it('should return correct number of days in month for leap year', () => {
            expect(getDaysInMonth(1, 2020)).toBe(29); // February in leap year
        });
    });

    describe('isLeapYear', () => {
        it('should return true for leap year', () => {
            expect(isLeapYear(2020)).toBe(true);
            expect(isLeapYear(2000)).toBe(true);
        });

        it('should return false for non-leap year', () => {
            expect(isLeapYear(2022)).toBe(false);
            expect(isLeapYear(1999)).toBe(false);
        });
    });

    describe('addDays', () => {
        it('should add days correctly', () => {
            const date = new Date('2022-01-01');
            const newDate = addDays(date, 10);
            expect(newDate.toISOString().split('T')[0]).toBe('2022-01-11');
        });
    });

    describe('diffDays', () => {
        it('should return correct difference in days', () => {
            const date1 = new Date('2022-01-01');
            const date2 = new Date('2022-01-11');
            expect(diffDays(date1, date2)).toBe(10);
        });
    });

    describe('getStartOfWeek', () => {
        it('should return start of week correctly', () => {
            const date = new Date('2022-01-05');
            const startOfWeek = getStartOfWeek(date);
            expect(startOfWeek.toISOString().split('T')[0]).toBe('2022-01-03');
        });
    });

    describe('getEndOfWeek', () => {
        it('should return end of week correctly', () => {
            const date = new Date('2022-01-05');
            const endOfWeek = getEndOfWeek(date);
            expect(endOfWeek.toISOString().split('T')[0]).toBe('2022-01-09');
        });
    });

    describe('formatRelativeTime', () => {
        it('should return correct relative time', () => {
            const date = new Date('2022-01-01');
            const now = new Date('2022-01-11');
            expect(formatRelativeTime(date)).toBe('10 days ago');
        });
    });

    describe('isValidDate', () => {
        it('should return true for valid date', () => {
            const date = new Date('2022-01-01');
            expect(isValidDate(date)).toBe(true);
        });

        it('should return false for invalid date', () => {
            const date = new Date('invalid date');
            expect(isValidDate(date)).toBe(false);
        });
    });

    describe('convertToTimezone', () => {
        it('should convert to timezone correctly', () => {
            const date = new Date('2022-01-01');
            const tz = 'America/New_York';
            const convertedDate = convertToTimezone(date, tz);
            expect(convertedDate.toISOString().split('T')[0]).toBe('2021-12-31');
        });
    });

    describe('getQuarter', () => {
        it('should return correct quarter', () => {
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
        it('should return true for weekend', () => {
            const date = new Date('2022-01-01');
            expect(isWeekend(date)).toBe(true);
            const date2 = new Date('2022-01-02');
            expect(isWeekend(date2)).toBe(false);
            const date3 = new Date('2022-01-08');
            expect(isWeekend(date3)).toBe(true);
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
        it('should return correct fiscal year', () => {
            const date = new Date('2022-01-01');
            expect(getFiscalYear(date)).toBe(2021);
            const date2 = new Date('2022-04-01');
            expect(getFiscalYear(date2)).toBe(2022);
        });
    });
});