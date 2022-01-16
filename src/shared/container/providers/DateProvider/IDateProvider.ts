interface IDateProvider {
    CompareInHours(start_date: Date, end_date: Date): number;
    ConvertToUTC(date: Date): string;
    DateNow(): Date;
}

export { IDateProvider };
