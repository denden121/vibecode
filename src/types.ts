export type Expense = {
  id: string;
  name: string;
  amount: number;
  icon: string;
};

export type Member = {
  id: string;
  /** Кому принадлежит этот блок бюджета, например «Жена». */
  name: string;
  /** Месячный доход (зарплата). */
  salary: number;
  /** Годовая премия (необязательно). Учитывается как среднее за месяц. */
  annualBonus?: number;
  /** Резервный буфер в процентах от дохода. */
  bufferPercent: number;
  expenses: Expense[];
};

export type BudgetData = {
  members: Member[];
};
