interface IDateProvider {
    CompareInHours(start_date: Date, end_date: Date): number;
    CompareInDays(start_date: Date, end_date: Date): number;
    ConvertToUTC(date: Date): string;
    DateNow(): Date;
    AddDays(days: number): Date;
    AddHours(hours: number): Date;
}

export { IDateProvider };
