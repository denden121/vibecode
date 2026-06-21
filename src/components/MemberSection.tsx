import type { Expense, Member } from "../types";
import { palette } from "../data";
import { formatMoney, formatNumber } from "../format";
import {
  allocatedPercent,
  bufferAmount,
  freeMoney,
  totalExpenses,
} from "../budget";
import { DonutChart, type Segment } from "./DonutChart";

type Props = {
  member: Member;
  onChange: (next: Member) => void;
};

const EMOJI_CHOICES = [
  "🏠", "✈️", "🛒", "💊", "📱", "🧾", "👗", "💄",
  "🚗", "🎓", "🎁", "🐶", "💪", "☕", "🎬", "💳",
];

export function MemberSection({ member, onChange }: Props) {
  const expensesTotal = totalExpenses(member);
  const buffer = bufferAmount(member);
  const free = freeMoney(member);
  const allocPercent = allocatedPercent(member);
  const overBudget = free < 0;

  const updateExpense = (id: string, patch: Partial<Expense>) => {
    onChange({
      ...member,
      expenses: member.expenses.map((e) =>
        e.id === id ? { ...e, ...patch } : e,
      ),
    });
  };

  const removeExpense = (id: string) => {
    onChange({ ...member, expenses: member.expenses.filter((e) => e.id !== id) });
  };

  const addExpense = () => {
    const newExpense: Expense = {
      id: `exp-${Date.now()}`,
      name: "Новая статья",
      amount: 0,
      icon: "💳",
    };
    onChange({ ...member, expenses: [...member.expenses, newExpense] });
  };

  const segments: Segment[] = member.expenses.map((e, i) => ({
    label: e.name,
    value: e.amount,
    color: palette[i % palette.length],
  }));
  segments.push({ label: "Буфер", value: buffer, color: "#64748b" });
  if (free > 0) {
    segments.push({ label: "Свободно", value: free, color: "rgba(148,163,184,0.35)" });
  }

  return (
    <section className="card member">
      <header className="member-head">
        <div>
          <span className="member-tag">Обязательные траты</span>
          <h2>{member.name}</h2>
        </div>
        <label className="salary-field">
          <span>Зарплата в месяц</span>
          <div className="salary-input">
            <input
              type="number"
              min={0}
              step={1000}
              value={member.salary || ""}
              onChange={(e) =>
                onChange({ ...member, salary: Number(e.target.value) })
              }
            />
            <span className="suffix">₽</span>
          </div>
        </label>
      </header>

      <div className="member-grid">
        <div className="chart-col">
          <DonutChart
            segments={segments}
            centerLabel={overBudget ? "Перерасход" : "Свободно"}
            centerValue={formatMoney(free)}
          />
          <div className="alloc-bar">
            <div
              className={`alloc-fill${overBudget ? " over" : ""}`}
              style={{ width: `${Math.min(allocPercent, 100)}%` }}
            />
          </div>
          <p className="alloc-note">
            Распределено {allocPercent}% дохода
          </p>
        </div>

        <div className="stats-col">
          <div className="stat">
            <span className="stat-label">Доход</span>
            <span className="stat-value">{formatMoney(member.salary)}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Обязательные траты</span>
            <span className="stat-value">{formatMoney(expensesTotal)}</span>
          </div>
          <div className="stat">
            <span className="stat-label">
              Буфер ({member.bufferPercent}% от дохода)
            </span>
            <span className="stat-value">{formatMoney(buffer)}</span>
          </div>
          <div className={`stat stat-free${overBudget ? " over" : ""}`}>
            <span className="stat-label">
              {overBudget ? "Перерасход" : "Свободные средства"}
            </span>
            <span className="stat-value">{formatMoney(free)}</span>
          </div>

          <label className="buffer-field">
            <span>Размер буфера</span>
            <div className="buffer-input">
              <input
                type="range"
                min={0}
                max={30}
                step={1}
                value={member.bufferPercent}
                onChange={(e) =>
                  onChange({ ...member, bufferPercent: Number(e.target.value) })
                }
              />
              <span className="buffer-value">{member.bufferPercent}%</span>
            </div>
          </label>
        </div>
      </div>

      <ul className="expenses">
        {member.expenses.map((e, i) => (
          <li key={e.id} className="expense-row">
            <span
              className="dot"
              style={{ background: palette[i % palette.length] }}
              aria-hidden
            />
            <select
              className="icon-select"
              value={e.icon}
              onChange={(ev) => updateExpense(e.id, { icon: ev.target.value })}
              aria-label="Иконка категории"
            >
              {(EMOJI_CHOICES.includes(e.icon)
                ? EMOJI_CHOICES
                : [e.icon, ...EMOJI_CHOICES]
              ).map((emoji) => (
                <option key={emoji} value={emoji}>
                  {emoji}
                </option>
              ))}
            </select>
            <input
              className="name-input"
              type="text"
              value={e.name}
              onChange={(ev) => updateExpense(e.id, { name: ev.target.value })}
            />
            <span className="share">
              {member.salary > 0
                ? `${Math.round((e.amount / member.salary) * 100)}%`
                : "—"}
            </span>
            <div className="amount-input">
              <input
                type="number"
                min={0}
                step={500}
                value={e.amount || ""}
                onChange={(ev) =>
                  updateExpense(e.id, { amount: Number(ev.target.value) })
                }
              />
              <span className="suffix">₽</span>
            </div>
            <button
              className="remove"
              onClick={() => removeExpense(e.id)}
              aria-label={`Удалить «${e.name}»`}
              title="Удалить"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      <div className="expenses-foot">
        <button className="add-btn" onClick={addExpense}>
          + Добавить статью
        </button>
        <span className="expenses-total">
          Итого трат: <strong>{formatNumber(expensesTotal)} ₽</strong>
        </span>
      </div>
    </section>
  );
}
