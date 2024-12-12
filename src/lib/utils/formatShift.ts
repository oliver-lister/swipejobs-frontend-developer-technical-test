import { TZDate } from "@date-fns/tz";
import { format } from "date-fns";

export const formatShift = (
  startDate: string,
  endDate: string,
  timeZone: string = "America/Chicago"
) => {
  const zonedStartDate = new TZDate(startDate, timeZone);
  const zonedEndDate = new TZDate(endDate, timeZone);

  const date = format(zonedStartDate, "LLL e, ccc").toUpperCase();

  const startTime = format(zonedStartDate, "hh:mm a");
  const endTime = format(zonedEndDate, "hh:mm a");

  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: timeZone,
    timeZoneName: "short",
  });

  const parts = formatter.formatToParts(zonedStartDate);
  const timeZoneAbbreviation = parts.find(
    (part) => part.type === "timeZoneName"
  )?.value;

  return `${date} ${startTime} - ${endTime} ${timeZoneAbbreviation}`;
};
