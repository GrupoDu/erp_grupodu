export function getMonthRange(): { actualMonth: Date; nextMonth: Date } {
  const today = new Date();
  const actualMonth: Date = new Date(today.getFullYear(), today.getMonth(), 1);
  const nextMonth: Date = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    1,
  );

  return { actualMonth, nextMonth };
}
