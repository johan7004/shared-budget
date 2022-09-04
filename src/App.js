import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useContext, useEffect } from "react";
import Home from "./routes/home/home.component";
import NavigationBar from "./routes/Navigation/navigation.component";
import WeeklyBudgetPage from "./routes/weekly-budget/weekly-budget";
import SignInPage from "./routes/sign-in/sign-in-page.component";
import { UserContext } from "./components/context/user.context.jsx";
import { BudgetContext } from "./components/context/budget.context.jsx";
import { userBudgetValues } from './utils/firebase.config';

function App() {
  const { currentUser } = useContext(UserContext);
  const { setBudgetValues } = useContext(BudgetContext);

  useEffect(() => {
    if (currentUser) {
      userBudgetValues().then((result) => setBudgetValues(result));
    }
  }, [currentUser,setBudgetValues]);

  return (
    <Routes>
      <Route path="/" element={<NavigationBar />}>
        <Route index element={<Home />}></Route>
        <Route path="weekly-budget" element={<WeeklyBudgetPage />}></Route>
        <Route path="sign-in" element={<SignInPage />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
