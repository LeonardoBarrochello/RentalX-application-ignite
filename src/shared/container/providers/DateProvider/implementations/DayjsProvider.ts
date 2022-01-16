import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { IDateProvider } from "../IDateProvider";

class DayjsProvider implements IDateProvider {
    CompareInHours(start_date: Date, end_date: Date): number {
        const start_date_utc = this.ConvertToUTC(start_date);
        const end_date_utc = this.ConvertToUTC(end_date);

        return dayjs(end_date_utc).diff(start_date_utc, "hours");
    }
    ConvertToUTC(date: Date): string {
        return dayjs(date).utc().local().format();
    }
    DateNow(): Date {
        return dayjs().toDate();
    }
}

export { DayjsProvider };
