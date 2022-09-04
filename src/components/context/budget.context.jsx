import { createContext, useState } from "react";




export const BudgetContext = createContext({
  budgetValues: null,
  setBudgetValues: () => null,
});

export const BudgetProvider = ({ children }) => {
  const [budgetValues, setBudgetValues] = useState(null);
  const values = { budgetValues, setBudgetValues, children };

  return (
    <BudgetContext.Provider value={values}>{children}</BudgetContext.Provider>
  );
};
