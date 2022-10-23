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
  Toast,
  ProgressBar,
} from "react-bootstrap";
import { useContext } from "react";
import { BudgetContext } from "../context/budget.context";
import { MoneyPotContext } from "../context/moneyPot.context";
import { useState, useEffect } from "react";
import {
  updateUserBudget,
  updateUserExpense,
  updateUserMoneyPot,
  updateUserAvailableBalance,
  updateUserTotalBalance
} from "./../../utils/firebase.config.js";
import { UserContext } from "./../context/user.context";
import piggyBank from "./../../assets/images/piggy-bank.png";

export default function BudgetSummary() {
  const [weeklyBudgetValue, setWeeklyBudget] = useState();
  const [monthlyBudgetValue, setMonthlyBudget] = useState();
  const [currencyValue, setCurrencyValue] = useState();
  const [weekTarget, setWeekTarget] = useState();
  const [expenses, setExpenses] = useState([]);
  const [totalBalanceValue, setTotalBalance] = useState();
  const [availableBalanceValue, setAvailableBalance] = useState();
  const [selectedExpenseCategory, setSelectedExpenseCategory] =
    useState("MISC");
  const [showToast, setShowToast] = useState(false);
  const [toastId, setToastId] = useState("");
  const [newPotValue, setNewPotValue] = useState(0);
  const { budgetValues, expenseValues } = useContext(BudgetContext);
  const { currentUser } = useContext(UserContext);
  const { moneyPotValues, setMoneyPotValues } = useContext(MoneyPotContext);

  const initialRender = useRef(true);

  const expenseCategories = [
    "MISC",
    "Groceries",
    "Bills",
    "Entertainment",
    "Restaurants",
    "Snacks",
    "Rent",
    "Transport",
    "Public Transport",
  ];

  const toastToggle = (e, toastID, potValue) => {
    setToastId(toastID);
    if (!showToast) {
      setShowToast(true);
    } else {
      setShowToast(false);
    }
  };

  useEffect(() => {
    if (budgetValues) {
      const {
        weeklyBudget,
        monthlyBudget,
        currencyValue,
        weekTarget,
        totalBalanceValue,
        availableBalanceValue,
      } = budgetValues;
      setWeeklyBudget(weeklyBudget);
      setWeekTarget(weekTarget);
      setMonthlyBudget(monthlyBudget);
      setCurrencyValue(currencyValue);
      setExpenses(expenseValues);
      setTotalBalance(totalBalanceValue);
      setAvailableBalance(availableBalanceValue);
    }
  }, [budgetValues, expenseValues]);

  const submitExpenseHandler = (e) => {
    e.preventDefault();
    const userExpense = e.target.elements.userExpense.value;

    setWeeklyBudget(weeklyBudgetValue - userExpense);
    setMonthlyBudget(monthlyBudgetValue - userExpense);
    setAvailableBalance(availableBalanceValue - userExpense);
    setTotalBalance(totalBalanceValue - userExpense);
    setExpenses((expenses) => [
      ...expenses,
      {
        expense: userExpense,
        category: selectedExpenseCategory,
        timeStamp: new Date().toDateString(),
      },
    ]);
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

  }, [
    weeklyBudgetValue,
    currencyValue,
    monthlyBudgetValue,
    weekTarget,
    availableBalanceValue,
    totalBalanceValue,
    expenses
  ]);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      updateUserExpense(expenses);
    }
  }, [expenses]);

  const potValueHandler = (e, currentValue, targetValue) => {
    const userInputValue = +e.target.value;
    const potTargetValue = +targetValue;
    const potCurrentValue = +currentValue;

    if (userInputValue >= potTargetValue) {
      console.log(`100% is reached ${userInputValue + potCurrentValue}`);
      setNewPotValue(userInputValue + potCurrentValue);
    } else {
      setNewPotValue(userInputValue + potCurrentValue);
      console.log(`target not reached ${userInputValue + potCurrentValue}`);
    }
  };
  console.log(newPotValue);

  const moneyDropHandler = (e, potData) => {
    e.preventDefault();
    console.log(potData);
    console.log(moneyPotValues);

    const userTarget = potData.potTarget;
    const userPotCurrentValue = potData.newPotValue;
    if (userPotCurrentValue !== 0) {
      if (userTarget >= userPotCurrentValue) {
        const potIndex = moneyPotValues.findIndex(
          (obj) => obj.potId === potData.potId
        );

        moneyPotValues[potIndex].currentPotValue = potData.newPotValue;

        console.log(
          `$ avaialbe balance ${availableBalanceValue - potData.newPotValue}`
        );
        setAvailableBalance(availableBalanceValue - potData.newPotValue);

        setMoneyPotValues(moneyPotValues);
        updateUserExpense(expenses);
        updateUserMoneyPot(moneyPotValues);
        console.log(expenses)
        setShowToast(false);
        setNewPotValue(0); // to reset the values not to affect other Pot's progress bar
      } else {
        console.log(`target reached`);
      }
    }
  };

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      updateUserAvailableBalance(availableBalanceValue);
    }
  },[availableBalanceValue])
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      updateUserTotalBalance(totalBalanceValue);
    }
  },[totalBalanceValue])

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
                    const userExpenseCategory = data.category;
                    const userExpenseTimeStamp = data.timeStamp;
                    return (
                      <Card.Text key={index}>
                        Spent: {userExpenseValue} {userExpenseCategory}{" "}
                        {userExpenseTimeStamp}
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
                  <Card.Text>
                    Available Balance : {availableBalanceValue} {currencyValue}
                  </Card.Text>
                  <Card.Text>
                    Total Balance : {totalBalanceValue} {currencyValue}
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
                  <Toast
                    className="toast__container"
                    name={potId}
                    show={potId === toastId ? showToast : false}
                    onClose={toastToggle}
                  >
                    <Toast.Header className="toast__header">
                      <strong className="me-auto">{potName}</strong>
                      <small>ID : {potId}</small>
                    </Toast.Header>
                    <Toast.Body className="toast-body-wrap">
                      <div className="toast-body__container">
                        <ProgressBar
                          now={
                            newPotValue
                              ? Math.round((newPotValue * 100) / potTarget)
                              : Math.round((potCurrentValue * 100) / potTarget)
                          }
                          label={`${
                            newPotValue
                              ? Math.round((newPotValue * 100) / potTarget)
                              : Math.round((potCurrentValue * 100) / potTarget)
                          }%`}
                        />
                        <span>Target : {potTarget}</span>
                        <span>Current Value : {potCurrentValue}</span>
                        <Form>
                          <Form.Control
                            type="number"
                            placeholder="Money To Drop"
                            name="updatedPotValue"
                            required="required"
                            onChange={(e) =>
                              potValueHandler(e, potCurrentValue, potTarget)
                            }
                          />
                          <Button
                            onClick={(e) =>
                              moneyDropHandler(e,{
                                potName,
                                potTarget,
                                newPotValue,
                                potId,
                              })
                            }
                            variant="primary"
                            type="submit"
                          >
                            Drop Money
                          </Button>
                        </Form>
                      </div>
                    </Toast.Body>
                  </Toast>
                  <Card
                    className="piggy-bank__item-card"
                    onClick={(e) => {
                      toastToggle(e, potId, potCurrentValue);
                    }}
                  >
                    <img key={potId} src={piggyBank} alt="piggy" />
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
