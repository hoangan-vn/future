export function subtractDays(date: Date, days: number) {
  const tempDate = new Date(date);
  tempDate.setDate(date.getDate() - days);

  return new Date(
    tempDate.getFullYear(),
    tempDate.getMonth(),
    tempDate.getDate()
  );
}
