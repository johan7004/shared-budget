import { React, Fragment, useRef } from "react";
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
import { MoneyPotContext } from "../context/moneyPot.context";
import { useState, useEffect } from "react";
import {
  updateUserBudget,
  updateUserExpense,
  userMoneyPotValues,
} from "./../../utils/firebase.config.js";
import { UserContext } from "./../context/user.context";
import piggyBank from "./../../assets/images/piggy-bank.png";

export default function BudgetSummary() {
  const [weeklyBudgetValue, setWeeklyBudget] = useState();
  const [monthlyBudgetValue, setMonthlyBudget] = useState();
  const [currencyValue, setCurrencyValue] = useState();
  const [weekTarget, setWeekTarget] = useState();
  const [expenses, setExpenses] = useState([]);
  const [selectedExpenseCategory, setSelectedExpenseCategory] = useState("MISC");

  const { budgetValues, expenseValues } = useContext(BudgetContext);
  const { currentUser } = useContext(UserContext);
  const { moneyPotValues, setMoneyPotValues } = useContext(MoneyPotContext);

  const initialRender = useRef(true);

  const expenseCategories = [
    "Groceries",
    "Bills",
    "Entertainment",
    "Restaurants",
    "Snacks",
    "Rent",
    "Transport",
    "Public Transport",
  ];
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
    setExpenses((expenses) => [...expenses, {expense:userExpense,category:selectedExpenseCategory}]);
  };

  const userExpenseCategoryHandler = (e) => {
    e.preventDefault();
    const selectedValue = e.target.value;
    setSelectedExpenseCategory(selectedValue);
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
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      updateUserExpense(expenses);
      
    }
  }, [expenses]);

  return (
    <Container className="summary-container">
      <Row>
        <Col className="card-container">
          <Card className="card-container__item" style={{ width: "18rem" }}>
            <Card.Body className="card-container__body">
              <Card.Title>Your Recent Expenses</Card.Title>

              {expenses
                ? expenses.slice(-2).map((data, index) => {

                  const userExpenseValue = data.expense;
                  const userExpenseCategory = data.category
                    return (
                       <Card.Text key={index}>
                         Spent: {userExpenseValue} {userExpenseCategory}
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
            <Card.Body className="card-container__body">
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
            <Card.Body className="card-container__body">
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
                    required="required"
                  />
                </FloatingLabel>
                <Form.Select
                  className="expense-form__container-select"
                  aria-label="Default select example"
                  onChange={userExpenseCategoryHandler}
                >
                  {expenseCategories.map((category, index) => {
                    return (
                      <option key={index} value={category}>
                        {category}
                      </option>
                    );
                  })}
                </Form.Select>
                <Button variant="primary" type="submit">
                  Add Expense
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="piggy-bank__container">
        {moneyPotValues
          ? moneyPotValues.map((data) => {
              const potName = data.name;
              const potTarget = data.target;
              const potCurrentValue = data.currentPotValue;
              const potId = data.potId;

              return (
                <Col key={potId} className="piggy-bank__item">
                  <Card className="piggy-bank__item-card">
                    <img src={piggyBank} alt="piggy" />
                    <div className="piggy-bank__info">
                      <p className="piggy-bank__info-text">{potName}</p>
                      <p className="piggy-bank__info-text">{potTarget}</p>
                      <p className="piggy-bank__info-text">{potCurrentValue}</p>
                    </div>
                  </Card>
                </Col>
              );
            })
          : ""}
      </Row>
    </Container>
  );
}
