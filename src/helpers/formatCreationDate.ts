const padDatePart = (value: number): string => value.toString().padStart(2, '0');

export const formatCreationDate = (rawDate: string): string => {
  if (!rawDate) {
    return "";
  }

  const parts = rawDate.split(/[./-]/);
  if (parts.length === 3) {
    const [first, second, third] = parts.map((part) => Number(part));
    const allFinite = [first, second, third].every(Number.isFinite);

    if (allFinite) {
      const isYearFirst = parts[0].length === 4 || first > 31;
      const day = isYearFirst ? third : first;
      const month = second;
      const year = isYearFirst ? first : third;

      return `${padDatePart(day)}.${padDatePart(month)}.${year}`;
    }
  }

  const parsedDate = new Date(rawDate);

  if (!Number.isNaN(parsedDate.getTime())) {
    return `${padDatePart(parsedDate.getDate())}.${padDatePart(
      parsedDate.getMonth() + 1
    )}.${parsedDate.getFullYear()}`;
  }

  return rawDate;
};

export default formatCreationDate;
