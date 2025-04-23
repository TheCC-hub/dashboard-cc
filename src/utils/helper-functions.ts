
export const isFutureOrToday = (date: string | Date): boolean => {
    const givenDate = new Date(date);

    if (isNaN(givenDate.getTime())) {
        console.error("Invalid date provided:", date);
        return false;
    }
    const today = new Date();

    today.setHours(0, 0, 0, 0);
    givenDate.setHours(0, 0, 0, 0);

    return givenDate >= today;
};

export function addDaysToDateTime(dateStr: string, days: number = 30): Date {
    // Ensure proper date format YYYY-MM-DD
    const dateParts = dateStr?.split("-"); // Split string into parts
    if (dateParts.length !== 3) throw new Error(`Invalid date format: ${dateStr}`);

    const year = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1; // Month is 0-based in JS
    const day = parseInt(dateParts[2], 10);

    // Create a valid Date object
    const date = new Date(year, month, day);

    if (isNaN(date.getTime())) {
        throw new Error(`Invalid date: ${dateStr}`);
    }

    date.setDate(date.getDate() + days); // Add days
    return date; // Returns a Date object
}

export function formatDate(isoDate: string) {
    const date = new Date(isoDate);
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth is 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
}