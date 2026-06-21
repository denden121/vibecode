import type { Member } from "./types";

/** Сумма всех обязательных трат участника. */
export function totalExpenses(member: Member): number {
  return member.expenses.reduce((sum, e) => sum + (e.amount || 0), 0);
}

/** Размер резервного буфера в рублях (процент от дохода). */
export function bufferAmount(member: Member): number {
  return Math.round((member.salary * member.bufferPercent) / 100);
}

/** Распределённые средства: траты + буфер. */
export function allocated(member: Member): number {
  return totalExpenses(member) + bufferAmount(member);
}

/** Свободные средства после трат и буфера. */
export function freeMoney(member: Member): number {
  return member.salary - allocated(member);
}

/** Доля распределённого дохода в процентах. */
export function allocatedPercent(member: Member): number {
  if (member.salary <= 0) return 0;
  return Math.round((allocated(member) / member.salary) * 100);
}
