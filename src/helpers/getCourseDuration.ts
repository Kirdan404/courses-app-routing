const padTimeUnit = (value: number): string =>
  value.toString().padStart(2, "0");

const toMinutes = (value: number | string): number => {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  return 0;
};

export const getCourseDuration = (minutesInput: number | string): string => {
  const minutesTotal = toMinutes(minutesInput);
  const safeDuration =
    Number.isFinite(minutesTotal) && minutesTotal > 0 ? minutesTotal : 0;

  const hours = Math.floor(safeDuration / 60);
  const minutes = Math.floor(safeDuration % 60);

  const hoursLabel = hours === 1 ? "hour" : "hours";

  return `${padTimeUnit(hours)}:${padTimeUnit(minutes)} ${hoursLabel}`;
};

export default getCourseDuration;
