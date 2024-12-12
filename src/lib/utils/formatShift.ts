import { toZonedTime, format } from "date-fns-tz";

export const formatShift = (
  startDate: string,
  endDate: string,
  timeZone: string = "America/Chicago"
) => {
  const zonedStartDate = toZonedTime(startDate, timeZone);
  const zonedEndDate = toZonedTime(endDate, timeZone);

  const date = format(zonedStartDate, "LLL d, ccc").toUpperCase();
  const startTime = format(zonedStartDate, "h:mm a");
  const endTime = format(zonedEndDate, "h:mm a");

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
