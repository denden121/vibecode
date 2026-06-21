import type { Member } from "./types";
import { useBudget } from "./useBudget";
import { MemberSection } from "./components/MemberSection";
import { freeMoney, totalExpenses, bufferAmount, monthlyIncome } from "./budget";
import { formatMoney } from "./format";

export default function App() {
  const { budget, setBudget, reset } = useBudget();

  const updateMember = (next: Member) => {
    setBudget((prev) => ({
      ...prev,
      members: prev.members.map((m) => (m.id === next.id ? next : m)),
    }));
  };

  const totalIncome = budget.members.reduce((s, m) => s + monthlyIncome(m), 0);
  const totalSpend = budget.members.reduce(
    (s, m) => s + totalExpenses(m) + bufferAmount(m),
    0,
  );
  const totalFree = budget.members.reduce((s, m) => s + freeMoney(m), 0);
  const showHousehold = budget.members.length > 1;

  return (
    <div className="page">
      <header className="page-head">
        <div className="brand">
          <span className="brand-mark">💰</span>
          <div>
            <h1>Семейный бюджет</h1>
            <p>Планируем обязательные траты и считаем свободные средства</p>
          </div>
        </div>
        <button className="reset-btn" onClick={reset} title="Сбросить к исходным значениям">
          Сбросить
        </button>
      </header>

      {showHousehold && (
        <section className="card household">
          <span className="household-title">Бюджет семьи в месяц</span>
          <div className="household-stats">
            <div className="household-stat">
              <span>Общий доход</span>
              <strong>{formatMoney(totalIncome)}</strong>
            </div>
            <div className="household-stat">
              <span>Распределено</span>
              <strong>{formatMoney(totalSpend)}</strong>
            </div>
            <div className="household-stat accent">
              <span>Свободно</span>
              <strong>{formatMoney(totalFree)}</strong>
            </div>
          </div>
        </section>
      )}

      <main className="members">
        {budget.members.map((m) => (
          <MemberSection key={m.id} member={m} onChange={updateMember} />
        ))}
      </main>

      <footer className="page-foot">
        <p>
          Все значения можно менять — расчёт обновляется сразу, данные
          сохраняются в этом браузере.
        </p>
      </footer>
    </div>
  );
}
