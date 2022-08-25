import React from "react";
import BudgetSummary from "../../components/budget-summary/budget-summary.component";
import "./home.styles.css";

export default function Home() {
  return (
    <div className="home-container">
      <BudgetSummary />
    </div>
  );
}
