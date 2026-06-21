import type { BudgetData } from "./types";

/**
 * Стартовые данные: обязательные траты жены.
 * Всё редактируется в интерфейсе, изменения сохраняются в браузере.
 */
export const defaultBudget: BudgetData = {
  members: [
    {
      id: "wife",
      name: "Жена",
      salary: 270000,
      bufferPercent: 10,
      expenses: [
        { id: "rent", name: "Квартира", amount: 45000, icon: "🏠" },
        { id: "travel", name: "Путешествия", amount: 30000, icon: "✈️" },
        { id: "food", name: "Еда", amount: 25000, icon: "🛒" },
        { id: "medicine", name: "Медицина", amount: 7000, icon: "💊" },
        { id: "subscriptions", name: "Подписки", amount: 2000, icon: "📱" },
        { id: "misc", name: "Мелкие расходы", amount: 10000, icon: "🧾" },
        { id: "clothes", name: "Одежда", amount: 7000, icon: "👗" },
        { id: "cosmetics", name: "Косметика", amount: 2000, icon: "💄" },
      ],
    },
  ],
};

/** Палитра для категорий и диаграммы. */
export const palette = [
  "#6366f1",
  "#ec4899",
  "#f59e0b",
  "#10b981",
  "#06b6d4",
  "#8b5cf6",
  "#ef4444",
  "#14b8a6",
  "#f97316",
  "#3b82f6",
];
