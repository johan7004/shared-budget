import { React, useEffect, useState, useContext, useRef } from "react";
import {
  Form,
  Button,
  Row,
  Col,
  Container,
  Card,
  ListGroup,
} from "react-bootstrap";
import {
  updateUserBudget,
  updateUserMoneyPot,
  userMoneyPotValues,
} from "./../../utils/firebase.config.js";
import "./weekly-budget.css";
import CurrencyList from "currency-list";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { UserContext } from "./../context/user.context";

import { MoneyPotContext } from "./../context/moneyPot.context";

function WeeklyBudget() {
  const [currencyList, setCurrencyList] = useState();
  const [moneyPot, setMoneyPot] = useState([]);
  const [weeklyResetDate, setWeeklyResetDate] = useState(new Date());
  const [monthlyResetDate, setMonthlyResetDate] = useState(new Date());
  const { currentUser } = useContext(UserContext);
  const { setMoneyPotValues } = useContext(MoneyPotContext);
  let initialRender = useRef(true);

  useEffect(() => {
    setCurrencyList(CurrencyList.getAll("en_GB"));
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    const weeklyBudgetValue = e.target.elements.weeklyBudget.value;
    const monthlyBudgetValue = e.target.elements.monthlyBudget.value;
    const currencyValue = e.target.elements.weeklyCurrency.value;
    const totalBalanceValue = e.target.elements.totalBalance.value;
    const availableBalanceValue = totalBalanceValue;
    const weekTarget = weeklyBudgetValue;
    const userBudget = {
      weeklyBudgetValue,
      currencyValue,
      monthlyBudgetValue,
      weekTarget,
      totalBalanceValue,
      availableBalanceValue
    };
    updateUserBudget(userBudget);

    window.location.href = window.location.origin;
  };

  const addMoneyPot = (e) => {
    e.preventDefault();
    const moneyPotName = e.target.elements.moneyPotName.value;
    const moneyPotValue = e.target.elements.moneyPotValue.value;
    const random = "abcdefghijklmnopqrstuvwxyz123456789";
    const size = 8;
    let code = "";

    for (let i = 1; i < size; i++) {
      code += random[Math.abs(Math.floor(Math.random() * random.length))];
    }

    setMoneyPot((moneyPot) => [
      ...moneyPot,
      {
        name: moneyPotName,
        target: moneyPotValue,
        potId: code,
        currentPotValue: 0,
      },
    ]);
  };

  useEffect(() => {
    if (currentUser) {
      if (!moneyPot && initialRender.current) {
        //updateUserMoneyPot(moneyPot);
        setMoneyPotValues(moneyPot);
        return;
      } 
    }
  }, [currentUser, moneyPot, setMoneyPotValues]);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
     updateUserMoneyPot(moneyPot);
      setMoneyPotValues(moneyPot);
    }
  }, [moneyPot, setMoneyPotValues]);

  useEffect(() => {
    if (currentUser) {
      const moneyPotFromFirebase = async () => {
        const result = await userMoneyPotValues();
        setMoneyPot(result);
      };
      moneyPotFromFirebase();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  const removePot = (e, id) => {
    const removedMoneyPot = moneyPot.filter((data) => data.potId !== id);

    setMoneyPot(removedMoneyPot);
  };

  const dateTileDisabled = ({ activeStartDate, date, view }) => {
    return date < new Date();
  };

  const weeklyDataReset = (nextValue) => {
    setWeeklyResetDate(nextValue);
  };
  const monthlyDataReset = (nextValue) => {
    setMonthlyResetDate(nextValue);
  };

  return (
    <Container>
      <Row className="weekly-page-container">
        <Col className="weekly-page-container__form">
          <Form onSubmit={(e) => submitHandler(e)}>
            <Row className="g-2 input-forms__container">
              <Col>
                <Form.Control
                  type="number"
                  placeholder="Weekly budget"
                  name="weeklyBudget"
                  required="required"
                />
              </Col>
              <Col>
                <Form.Control
                  type="number"
                  placeholder="Total Balance"
                  name="totalBalance"
                  required="required"
                />
              </Col>
              <Col>
                <Form.Select
                  aria-label="Floating label select example"
                  name="weeklyCurrency"
                  required="required"
                >
                  {currencyList
                    ? Object.keys(currencyList).map((data, index) => {
                        return (
                          <option key={index} value={currencyList[data].code}>
                            {currencyList[data].code}{" "}
                          </option>
                        );
                      })
                    : ""}
                </Form.Select>
              </Col>

              <Col>
                <Form.Control
                  type="number"
                  placeholder="monthly budget"
                  name="monthlyBudget"
                  required="required"
                />
              </Col>
            </Row>
            <Row className="dates-container">
              <Col>
                <h3 className="dates-container__label">For Weekly Reset</h3>
                <Calendar
                  className="calendar-container"
                  onChange={weeklyDataReset}
                  value={weeklyResetDate}
                  tileDisabled={dateTileDisabled}
                />
              </Col>
              <Col>
                <h3 className="dates-container__label">For Monthly Reset</h3>
                <Calendar
                  className="calendar-container"
                  onChange={monthlyDataReset}
                  value={monthlyResetDate}
                  tileDisabled={dateTileDisabled}
                />
              </Col>
            </Row>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
        <Col>
          <Card className="money-pot-card-container">
            <Card.Body className="money-pot-card-container__body">
              <Card.Title className="money-pot-card-container__title">
                Your Money Pots
              </Card.Title>
              <Form onSubmit={addMoneyPot}>
                <Form.Group className="mb-3 money-pot-card-container__group">
                  <Form.Control
                    className="money-pot-card-container__input"
                    type="text"
                    name="moneyPotName"
                    placeholder="Your Money Pot Name"
                    required="required"
                  />
                  <Form.Control
                    className="money-pot-card-container__input"
                    type="number"
                    name="moneyPotValue"
                    placeholder="Your Money Pot Target"
                    required="required"
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  className="money-pot-card-container__btn"
                >
                  Add Money Pot
                </Button>
              </Form>
              <Container className="money-pot-card-container__list">
                <Row className="money-pot-card-container__list-row">
                  <Col>
                    <ListGroup>
                      {moneyPot
                        ? moneyPot.map((data, i) => {
                            const potName = data.name;
                            const potTarget = data.target;
                            const ID = data.potId;

                            return (
                              <ListGroup.Item key={ID}>
                                <Row>
                                  <Col>{potName}</Col>
                                  <Col>
                                    <Row>
                                      <Col>{potTarget}</Col>
                                      <Col>
                                        <Button
                                          variant="danger"
                                          onClick={(e) => removePot(e, ID)}
                                        >
                                          Remove
                                        </Button>
                                      </Col>
                                    </Row>
                                  </Col>
                                </Row>
                              </ListGroup.Item>
                            );
                          })
                        : ""}
                    </ListGroup>
                  </Col>
                </Row>
              </Container>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default WeeklyBudget;
