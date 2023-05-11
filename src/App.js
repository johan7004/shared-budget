import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useContext, useEffect } from "react";
import Home from "./routes/home/home.component";
import NavigationBar from "./routes/Navigation/navigation.component";
import BudgetSummary from './components/budget-summary/budget-summary.component.jsx'
import WeeklyBudgetPage from "./routes/weekly-budget/weekly-budget";
import SignInPage from "./routes/sign-in/sign-in-page.component";
import { UserContext } from "./components/context/user.context.jsx";
import { BudgetContext } from "./components/context/budget.context.jsx";
import {MoneyPotContext} from './components/context/moneyPot.context';
import { userBudgetValues, userMoneyPotValues} from './utils/firebase.config';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const { currentUser } = useContext(UserContext);
  const { setBudgetValues,setExpenseValues } = useContext(BudgetContext);
  const {setMoneyPotValues} = useContext(MoneyPotContext);

  useEffect(() => {
    if (currentUser) {
      userBudgetValues().then((result) => setBudgetValues(result));
      userBudgetValues().then((result) => setExpenseValues(result.expenses));
      const moneyPotFromFirebase = async () => {
        const result = await userMoneyPotValues();
        setMoneyPotValues(result);
      };
      moneyPotFromFirebase();
    }
  }, [currentUser, setBudgetValues, setExpenseValues, setMoneyPotValues]);

  return (
    <Routes>
      <Route  path="/" element={<NavigationBar />}>
        <Route index element={<Home />}></Route>
        <Route path="dashboard" element={<BudgetSummary />}></Route>
        <Route path="weekly-budget" element={<WeeklyBudgetPage />}></Route>
        <Route exact path="sign-in" element={<SignInPage />}></Route>
        
      </Route>
    </Routes>
  );
}

export default App;
