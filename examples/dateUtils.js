/**
 * Advanced Date Utilities for AiTestGen
 */

function formatDate(date) {
    if (!date) return "NaN-NaN-NaN";
    const d = new Date(date);
    if (isNaN(d.getTime())) return "NaN-NaN-NaN";

    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

function getDaysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}

function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

function addDays(date, days) {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    return d;
}

function diffDays(d1, d2) {
    const diffTime = Math.abs(new Date(d2) - new Date(d1));
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

function getStartOfWeek(date) {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
}

function getEndOfWeek(date) {
    const start = getStartOfWeek(date);
    return addDays(start, 6);
}

function formatRelativeTime(date) {
    const now = new Date();
    const diff = now - new Date(date);
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} days ago`;
    if (hours > 0) return `${hours} hours ago`;
    if (minutes > 0) return `${minutes} minutes ago`;
    return 'Just now';
}

function isValidDate(date) {
    const d = new Date(date);
    return d instanceof Date && !isNaN(d);
}

function convertToTimezone(date, tz) {
    return new Date(new Date(date).toLocaleString('en-US', { timeZone: tz }));
}

function getQuarter(date) {
    const d = new Date(date);
    return Math.floor((d.getMonth() + 3) / 3);
}

function isWeekend(date) {
    const d = new Date(date);
    const day = d.getDay();
    return day === 0 || day === 6;
}

function getFiscalYear(date) {
    const d = new Date(date);
    return d.getMonth() >= 3 ? d.getFullYear() : d.getFullYear() - 1;
}


module.exports = {
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
};
