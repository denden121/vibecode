import type { Member } from "./types";

/** Среднемесячный эквивалент годовой премии. */
export function monthlyBonus(member: Member): number {
  return Math.round((member.annualBonus || 0) / 12);
}

/** Среднемесячный доход: зарплата + усреднённая премия. */
export function monthlyIncome(member: Member): number {
  return member.salary + monthlyBonus(member);
}

/** Сумма всех обязательных трат участника. */
export function totalExpenses(member: Member): number {
  return member.expenses.reduce((sum, e) => sum + (e.amount || 0), 0);
}

/** Размер резервного буфера в рублях (процент от дохода). */
export function bufferAmount(member: Member): number {
  return Math.round((monthlyIncome(member) * member.bufferPercent) / 100);
}

/** Распределённые средства: траты + буфер. */
export function allocated(member: Member): number {
  return totalExpenses(member) + bufferAmount(member);
}

/** Свободные средства после трат и буфера. */
export function freeMoney(member: Member): number {
  return monthlyIncome(member) - allocated(member);
}

/** Доля распределённого дохода в процентах. */
export function allocatedPercent(member: Member): number {
  const income = monthlyIncome(member);
  if (income <= 0) return 0;
  return Math.round((allocated(member) / income) * 100);
}
