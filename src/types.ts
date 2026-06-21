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
  /** Месячный доход. */
  salary: number;
  /** Резервный буфер в процентах от дохода. */
  bufferPercent: number;
  expenses: Expense[];
};

export type BudgetData = {
  members: Member[];
};
