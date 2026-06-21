const rub = new Intl.NumberFormat("ru-RU", {
  style: "currency",
  currency: "RUB",
  maximumFractionDigits: 0,
});

/** Форматирует число как рубли: 45000 → «45 000 ₽». */
export function formatMoney(value: number): string {
  return rub.format(Math.round(value || 0));
}

/** Компактная запись для подписей: 45000 → «45 000». */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat("ru-RU").format(Math.round(value || 0));
}
