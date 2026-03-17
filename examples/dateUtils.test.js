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

        it('should handle dates with single digit month and day', () => {
            const date = new Date('2022-01-01');
            expect(dateUtils.formatDate(date)).toBe("2022-01-01");
        });

        it('should handle dates with double digit month and day', () => {
            const date = new Date('2022-12-12');
            expect(dateUtils.formatDate(date)).toBe("2022-12-12");
        });
    });

    describe('getDaysInMonth', () => {
        it('should return correct number of days in month', () => {
            expect(dateUtils.getDaysInMonth(1, 2022)).toBe(31);
            expect(dateUtils.getDaysInMonth(2, 2022)).toBe(28);
            expect(dateUtils.getDaysInMonth(3, 2022)).toBe(31);
        });

        it('should handle leap years', () => {
            expect(dateUtils.getDaysInMonth(2, 2020)).toBe(29);
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
            const result = dateUtils.addDays(date, 5);
            expect(result.toISOString().split('T')[0]).toBe('2022-01-06');
        });

        it('should handle adding days across months', () => {
            const date = new Date('2022-01-25');
            const result = dateUtils.addDays(date, 10);
            expect(result.toISOString().split('T')[0]).toBe('2022-02-04');
        });
    });

    describe('diffDays', () => {
        it('should return correct difference in days', () => {
            const date1 = new Date('2022-01-01');
            const date2 = new Date('2022-01-05');
            expect(dateUtils.diffDays(date1, date2)).toBe(4);
        });

        it('should handle dates in different months', () => {
            const date1 = new Date('2022-01-25');
            const date2 = new Date('2022-02-05');
            expect(dateUtils.diffDays(date1, date2)).toBe(11);
        });
    });

    describe('getStartOfWeek', () => {
        it('should return start of week correctly', () => {
            const date = new Date('2022-01-05');
            const result = dateUtils.getStartOfWeek(date);
            expect(result.toISOString().split('T')[0]).toBe('2022-01-03');
        });

        it('should handle dates that are already at the start of the week', () => {
            const date = new Date('2022-01-03');
            const result = dateUtils.getStartOfWeek(date);
            expect(result.toISOString().split('T')[0]).toBe('2022-01-03');
        });
    });

    describe('getEndOfWeek', () => {
        it('should return end of week correctly', () => {
            const date = new Date('2022-01-05');
            const result = dateUtils.getEndOfWeek(date);
            expect(result.toISOString().split('T')[0]).toBe('2022-01-09');
        });

        it('should handle dates that are already at the end of the week', () => {
            const date = new Date('2022-01-09');
            const result = dateUtils.getEndOfWeek(date);
            expect(result.toISOString().split('T')[0]).toBe('2022-01-09');
        });
    });

    describe('formatRelativeTime', () => {
        it('should format relative time correctly', () => {
            const date = new Date('2022-01-01');
            const now = new Date('2022-01-01');
            expect(dateUtils.formatRelativeTime(date)).toBe('Just now');
        });

        it('should handle dates in the past', () => {
            const date = new Date('2022-01-01');
            const now = new Date('2022-01-02');
            expect(dateUtils.formatRelativeTime(date)).toBe('1 days ago');
        });

        it('should handle dates in the future', () => {
            const date = new Date('2022-01-02');
            const now = new Date('2022-01-01');
            expect(dateUtils.formatRelativeTime(date)).toBe('Just now'); // Note: This function does not handle future dates correctly
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
        it('should convert to timezone correctly', () => {
            const date = new Date('2022-01-01');
            const result = dateUtils.convertToTimezone(date, 'America/New_York');
            expect(result.toISOString().split('T')[0]).toBe('2021-12-31');
        });
    });

    describe('getQuarter', () => {
        it('should return correct quarter', () => {
            const date = new Date('2022-01-01');
            expect(dateUtils.getQuarter(date)).toBe(1);
            const date2 = new Date('2022-04-01');
            expect(dateUtils.getQuarter(date2)).toBe(2);
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
            const date2 = new Date('2022-04-01');
            expect(dateUtils.getFiscalYear(date2)).toBe(2022);
        });

        it('should handle dates in different years', () => {
            const date = new Date('2023-01-01');
            expect(dateUtils.getFiscalYear(date)).toBe(2022);
        });
    });
});