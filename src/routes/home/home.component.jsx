import { React, useContext } from "react";
import BudgetSummary from "../../components/budget-summary/budget-summary.component";
import HomePage from "./../../components/home-page/home-page.component";
import {Container} from 'react-bootstrap'
import { UserContext } from "./../../components/context/user.context";
import "./home.styles.css";

export default function Home() {
  const { currentUser } = useContext(UserContext);
  return (
    <Container className="home-container">
      {currentUser ? <BudgetSummary /> : <HomePage />}
    </Container>
  );
}
