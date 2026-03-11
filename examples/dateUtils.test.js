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

    describe('addDays', () => {
        it('should add days correctly', () => {
            const date = new Date('2022-01-01');
            const newDate = dateUtils.addDays(date, 10);
            expect(newDate.toISOString().split('T')[0]).toBe("2022-01-11");
        });
    });

    describe('diffDays', () => {
        it('should calculate difference in days correctly', () => {
            const date1 = new Date('2022-01-01');
            const date2 = new Date('2022-01-11');
            expect(dateUtils.diffDays(date1, date2)).toBe(10);
        });
    });

    describe('getStartOfWeek', () => {
        it('should return start of week correctly', () => {
            const date = new Date('2022-01-05');
            const startOfWeek = dateUtils.getStartOfWeek(date);
            expect(startOfWeek.toISOString().split('T')[0]).toBe("2022-01-03");
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
            expect(dateUtils.getFiscalYear(date)).toBe(2021);
            const date2 = new Date('2022-04-01');
            expect(dateUtils.getFiscalYear(date2)).toBe(2022);
        });
    });
});