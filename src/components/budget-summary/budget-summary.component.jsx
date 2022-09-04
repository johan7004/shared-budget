import React from "react";
import "./budget-summary.styles.css";
import { Link } from "react-router-dom";
import {
  Row,
  Container,
  Col,
  Card,
  Button,
  Form,
  FloatingLabel,
} from "react-bootstrap";
import { useContext } from "react";
import { BudgetContext } from "../context/budget.context";
import { useState, useEffect } from "react";
import {updateUserBudget} from './../../utils/firebase.config.js'

export default function BudgetSummary() {
  const [weeklyBudgetValue, setWeeklyBudget] = useState();
  const [monthlyBudgetValue, setMonthlyBudget] = useState();
  const [currencyValue, setCurrencyValue] = useState();
  const [weekTarget, setWeekTarget] = useState();

  const { budgetValues } = useContext(BudgetContext);

  useEffect(() => {
    if (budgetValues) {
      const { weeklyBudget, monthlyBudget, currencyValue } = budgetValues;
      setWeeklyBudget(weeklyBudget);
      setWeekTarget(weeklyBudget);
      setMonthlyBudget(monthlyBudget);
      setCurrencyValue(currencyValue);
    }
  }, [budgetValues]);

  const submitExpenseHandler = (e) => {
    e.preventDefault();
    const userExpense = e.target.elements.userExpense.value;

    setWeeklyBudget(weeklyBudgetValue - userExpense);
    setMonthlyBudget(monthlyBudgetValue - userExpense);
  };

  useEffect(() => {
    const userBudget = { weeklyBudgetValue, currencyValue,monthlyBudgetValue,weekTarget };
    console.log(`updated values`);
    console.log(userBudget);
    updateUserBudget(userBudget);
  },[weeklyBudgetValue, currencyValue,monthlyBudgetValue,weekTarget])

  return (
    <Container className="summary-container">
      <Row>
        <Col className="card-container">
          <Card className="card-container__item" style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>Your Recent Expenses</Card.Title>
              <Card.Text>Spent Date : 20 leva</Card.Text>
              <Card.Text>Spent Date : 20 leva</Card.Text>
              <Button variant="primary">
                <Link to="weekly-budget">Weekly Budget</Link>
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col className="card-container">
          <Card className="card-container__item" style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>Remaining Budget Funds</Card.Title>
              <Card.Text>
                For This Week : {weeklyBudgetValue} {currencyValue}
              </Card.Text>
              <Card.Text>
                For This Month : {monthlyBudgetValue} {currencyValue}
              </Card.Text>
              <Card.Text>
                This week Target : {weekTarget} {currencyValue}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col className="card-container">
          <Card className="card-container__item" style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>Add Expense</Card.Title>
              <Form
                className="expense-form__container"
                onSubmit={(e) => submitExpenseHandler(e)}
              >
                <FloatingLabel
                  controlId="floatingInputGrid"
                  label="Add Your Expense Here"
                  className="expense-form__container--input"
                >
                  <Form.Control
                    type="number"
                    placeholder="Enter Your Weekly budget"
                    name="userExpense"
                  />
                </FloatingLabel>
                <Button variant="primary" type="submit">
                  Add Expense
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <p>Graph shows the expenses for month</p>
        </Col>
      </Row>
    </Container>
  );
}
