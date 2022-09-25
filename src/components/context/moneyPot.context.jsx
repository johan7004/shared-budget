import { createContext, useState } from "react";

export const MoneyPotContext = createContext({
  moneyPotValues: null,
  setMoneyPotValues: () => null,
});

export const MoneyPotProvider = ({ children }) => {
  const [moneyPotValues, setMoneyPotValues] = useState(null);

  const values = {
    moneyPotValues,
    setMoneyPotValues,
  };

  console.log(moneyPotValues);

  return (
    <MoneyPotContext.Provider value={values}>
      {children}
    </MoneyPotContext.Provider>
  );
};
