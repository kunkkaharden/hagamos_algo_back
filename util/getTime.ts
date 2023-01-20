export const getTime = (start_date: Date, end_date: Date) => {
    const start = start_date.getTime() / 1000;
    const end = end_date.getTime() / 1000;
    return (end - start) / 60;
}