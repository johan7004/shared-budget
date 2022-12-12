import { React} from "react";
import BudgetSummary from "../../components/budget-summary/budget-summary.component";
import HomePage from "./../../components/home-page/home-page.component";
import {Container} from 'react-bootstrap'
import "./home.styles.css";

export default function Home() {
  return (
    <Container className="home-container">
       <HomePage />
    </Container>
  );
}
