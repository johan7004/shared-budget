import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./routes/home/home.component";
import NavigationBar from "./routes/Navigation/navigation.component";
import WeeklyBudgetPage from "./routes/weekly-budget/weekly-budget";
import ExpensesPage from "./routes/expenses/expenses.component";
import SignInPage from "./routes/sign-in/sign-in-page.component";

function App() {
  return (
    <Routes>
      <Route path="/" element={<NavigationBar />}>
        <Route index element={<Home />}></Route>
        <Route path="weekly-budget" element={<WeeklyBudgetPage />}></Route>
        <Route path="overall-expenses" element={<ExpensesPage />}></Route>
        <Route path="sign-in" element={<SignInPage />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
