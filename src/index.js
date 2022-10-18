import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./components/context/user.context.jsx";
import { BudgetProvider } from "./components/context/budget.context.jsx";
import { MoneyPotProvider } from "./components/context/moneyPot.context.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //<React.StrictMode>
    <UserProvider>
      <BudgetProvider>
        <MoneyPotProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </MoneyPotProvider>
      </BudgetProvider>
    </UserProvider>
  //</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
