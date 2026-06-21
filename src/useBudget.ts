import { useCallback, useEffect, useState } from "react";
import type { BudgetData } from "./types";
import { defaultBudget } from "./data";

const STORAGE_KEY = "family-budget:v2";

function load(): BudgetData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return structuredClone(defaultBudget);
    const parsed = JSON.parse(raw) as BudgetData;
    if (!parsed.members?.length) return structuredClone(defaultBudget);
    return parsed;
  } catch {
    return structuredClone(defaultBudget);
  }
}

/** Состояние бюджета с автосохранением в localStorage. */
export function useBudget() {
  const [budget, setBudget] = useState<BudgetData>(load);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(budget));
    } catch {
      // localStorage недоступен — просто работаем в памяти.
    }
  }, [budget]);

  const reset = useCallback(() => {
    setBudget(structuredClone(defaultBudget));
  }, []);

  return { budget, setBudget, reset };
}
