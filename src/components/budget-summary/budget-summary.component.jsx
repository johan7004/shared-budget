import { React, Fragment } from "react";
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
import { updateUserBudget, updateUserExpense } from "./../../utils/firebase.config.js";
import { UserContext } from "./../context/user.context";

export default function BudgetSummary() {
  const [weeklyBudgetValue, setWeeklyBudget] = useState();
  const [monthlyBudgetValue, setMonthlyBudget] = useState();
  const [currencyValue, setCurrencyValue] = useState();
  const [weekTarget, setWeekTarget] = useState();
  const [expenses, setExpenses] = useState([]);

  const { budgetValues,expenseValues } = useContext(BudgetContext);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    if (budgetValues) {
      const { weeklyBudget, monthlyBudget, currencyValue, weekTarget } =
        budgetValues;
      setWeeklyBudget(weeklyBudget);
      setWeekTarget(weekTarget);
      setMonthlyBudget(monthlyBudget);
      setCurrencyValue(currencyValue);
      setExpenses(expenseValues);
    }
  }, [budgetValues, expenseValues]);

  const submitExpenseHandler = (e) => {
    e.preventDefault();
    const userExpense = e.target.elements.userExpense.value;

    setWeeklyBudget(weeklyBudgetValue - userExpense);
    setMonthlyBudget(monthlyBudgetValue - userExpense);
    setExpenses((expenses) => [...expenses, userExpense]);
  };

  useEffect(() => {
    const userBudget = {
      weeklyBudgetValue,
      currencyValue,
      monthlyBudgetValue,
      weekTarget,
    };
    updateUserBudget(userBudget);
  }, [weeklyBudgetValue, currencyValue, monthlyBudgetValue, weekTarget]);

  useEffect(() => {
    updateUserExpense(expenses);
  }, [expenses]);

  return (
    <Container className="summary-container">
      <Row>
        <Col className="card-container">
          <Card className="card-container__item" style={{ width: "18rem" }}>
            <Card.Body className= "card-container__body">
              <Card.Title>Your Recent Expenses</Card.Title>

              {expenses
                ? expenses.slice(-2).map((data, index) => {
                    return (
                      <Card.Text key={index}>
                        Spent: {data} {currencyValue}
                      </Card.Text>
                    );
                  })
                : ""}
              <Button variant="primary">
                <Link to="weekly-budget">Weekly Budget</Link>
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col className="card-container">
          <Card className="card-container__item" style={{ width: "18rem" }}>
            <Card.Body className= "card-container__body">
              <Card.Title>Remaining Budget Funds</Card.Title>

              {currentUser ? (
                <Fragment>
                  <Card.Text>
                    For This Week : {weeklyBudgetValue} {currencyValue}
                  </Card.Text>
                  <Card.Text>
                    For This Month : {monthlyBudgetValue} {currencyValue}
                  </Card.Text>
                  <Card.Text>
                    This week Target : {weekTarget} {currencyValue}
                  </Card.Text>
                </Fragment>
              ) : (
                "Sign In"
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col className="card-container">
          <Card className="card-container__item" style={{ width: "18rem" }}>
            <Card.Body className= "card-container__body">
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
    </Container>
  );
}
