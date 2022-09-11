import { createContext, useState } from "react";

export const BudgetContext = createContext({
  budgetValues: null,
  expenseValues: null,
  setExpenseValues: () => null,
  setBudgetValues: () => null,
});

export const BudgetProvider = ({ children }) => {
  const [budgetValues, setBudgetValues] = useState(null);
  const [expenseValues, setExpenseValues] = useState(null);
  const values = {
    budgetValues,
    setBudgetValues,
    children,
    expenseValues,
    setExpenseValues,
  };

  return (
    <BudgetContext.Provider value={values}>{children}</BudgetContext.Provider>
  );
};
