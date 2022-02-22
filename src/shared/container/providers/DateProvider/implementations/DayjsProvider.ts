import dayjs from "dayjs";

import { IDateProvider } from "../IDateProvider";

class DayjsProvider implements IDateProvider {
    CompareInDays(start_date: Date, end_date: Date): number {
        const start_date_utc = this.ConvertToUTC(start_date);
        const end_date_utc = this.ConvertToUTC(end_date);

        return dayjs(end_date_utc).diff(start_date_utc, "days");
    }
    CompareInHours(start_date: Date, end_date: Date): number {
        const start_date_utc = this.ConvertToUTC(start_date);
        const end_date_utc = this.ConvertToUTC(end_date);

        return dayjs(end_date_utc).diff(start_date_utc, "hours");
    }
    CompareIfBefore(start_date: Date, end_date: Date): boolean {
        return dayjs(start_date).isBefore(end_date);
    }
    ConvertToUTC(date: Date): string {
        return dayjs(date).utc().local().format();
    }
    DateNow(): Date {
        return dayjs().toDate();
    }
    AddDays(days: number): Date {
        return dayjs().add(days, "days").toDate();
    }
    AddHours(hours: number): Date {
        return dayjs().add(hours, "hours").toDate();
    }
}

export { DayjsProvider };
