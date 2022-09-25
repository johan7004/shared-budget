import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useContext, useEffect } from "react";
import Home from "./routes/home/home.component";
import NavigationBar from "./routes/Navigation/navigation.component";
import WeeklyBudgetPage from "./routes/weekly-budget/weekly-budget";
import SignInPage from "./routes/sign-in/sign-in-page.component";
import { UserContext } from "./components/context/user.context.jsx";
import { BudgetContext } from "./components/context/budget.context.jsx";
import {MoneyPotContext} from './components/context/moneyPot.context';
import { userBudgetValues, userMoneyPotValues } from './utils/firebase.config';

function App() {
  const { currentUser } = useContext(UserContext);
  const { setBudgetValues,setExpenseValues } = useContext(BudgetContext);
  const {setMoneyPotValues} = useContext(MoneyPotContext);

  useEffect(() => {
    if (currentUser) {
      userBudgetValues().then((result) => setBudgetValues(result));
      userBudgetValues().then((result) => setExpenseValues(result.expenses));
      const userPot = async()=>{
        const result = await userMoneyPotValues();

        console.log(result);
      }
      userPot();

    }
  }, [currentUser, setBudgetValues, setExpenseValues, setMoneyPotValues]);

  return (
    <Routes>
      <Route  path="/" element={<NavigationBar />}>
        <Route index element={<Home />}></Route>
        <Route path="weekly-budget" element={<WeeklyBudgetPage />}></Route>
        <Route exact path="sign-in" element={<SignInPage />}></Route>
        
      </Route>
    </Routes>
  );
}

export default App;
