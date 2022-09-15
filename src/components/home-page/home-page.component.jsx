import { React } from "react";
import "./home-page.style.css";

export default function HomePage() {
  return (
    <div className="home-page__container">
      <div className="catch-phrase__container">
        <h1 className="catch-phrase__item lineUp">Save Money</h1>
        <h1 className="catch-phrase__item lineUp--second">Track Expenses</h1>
        <h1 className="catch-phrase__item lineUp--third">Achieve Goals</h1>
      </div>
    </div>
  );
}
