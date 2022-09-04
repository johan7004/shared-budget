import { React, useEffect, useState } from "react";
import { Form, Button, FloatingLabel, Row, Col } from "react-bootstrap";
import { updateUserBudget } from "./../../utils/firebase.config.js";
import "./weekly-budget.css";
import CurrencyList from "currency-list";

function WeeklyBudget() {
  const [currencyList, setCurrencyList] = useState();

  useEffect(() => {
    console.log(CurrencyList.getAll("en_GB"));
    setCurrencyList(CurrencyList.getAll("en_GB"));
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    const weeklyBudgetValue = e.target.elements.weeklyBudget.value;
    const monthlyBudgetValue = e.target.elements.monthlyBudget.value;
    const currencyValue = e.target.elements.weeklyCurrency.value;
    const weekTarget= weeklyBudgetValue;
    console.log(`for submitted ${monthlyBudgetValue}`);
    console.log(currencyValue);
    const userBudget = { weeklyBudgetValue, currencyValue,monthlyBudgetValue, weekTarget };
    updateUserBudget(userBudget);
  };

  return (
    <>
      <Form onSubmit={(e) => submitHandler(e)}>
        <Row className="g-2 input-forms__container">
          <Col md>
            <FloatingLabel
              controlId="floatingInputGrid"
              label="Your Weekly Budget"
            >
              <Form.Control
                type="number"
                placeholder="Enter Your Weekly budget"
                name="weeklyBudget"
              />
            </FloatingLabel>
          </Col>
          <Col md>
            <FloatingLabel
              controlId="floatingSelectGrid"
              label="Choose Currency"
            >
              <Form.Select
                aria-label="Floating label select example"
                name="weeklyCurrency"
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
            </FloatingLabel>
          </Col>
        </Row>
        <Row className="g-2 input-forms__container">
          <Col>
            <FloatingLabel
              controlId="floatingInputGrid"
              label="Your Monthly Budget"
            >
              <Form.Control
                type="number"
                placeholder="Enter Your Weekly budget"
                name="monthlyBudget"
              />
            </FloatingLabel>
          </Col>
        </Row>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}

export default WeeklyBudget;
