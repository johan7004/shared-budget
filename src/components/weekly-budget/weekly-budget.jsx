import { React, useEffect, useState } from "react";
import {
  Form,
  Button,
  FloatingLabel,
  Row,
  Col,
  Container,
  Card,
  ListGroup
} from "react-bootstrap";
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
    const weekTarget = weeklyBudgetValue;
    console.log(`for submitted ${monthlyBudgetValue}`);
    console.log(currencyValue);
    const userBudget = {
      weeklyBudgetValue,
      currencyValue,
      monthlyBudgetValue,
      weekTarget,
    };
    updateUserBudget(userBudget);
    window.location.href = window.location.origin;
  };

const addMoneyPot =(e)=>{
 const moneyPotName = e.target.elements.moneyPotName.value;
 const moneyPotValue = e.target.elements.moneyPotValue.value;

 console.log(moneyPotName)
 console.log(moneyPotValue)
}

  return (
    <Container>
    <Row>
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
        <Row>
          <Col>
            <p>Weekly Reset Date</p>
            <p>Monthly Reset Data</p>
          </Col>
        </Row>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <Card
      className="money-pot-card-container"
      style={{ width: "18rem" }}
    >
      <Card.Body className="money-pot-card-container__body">
        <Card.Title className="money-pot-card-container__title">
          Your Money Pots
        </Card.Title>
        <Form onSubmit={addMoneyPot}>
          <Form.Group
            className="mb-3 money-pot-card-container__group"
          >
            <Form.Control
              className="money-pot-card-container__input"
              type="text"
              name="moneyPotName"
              placeholder="Your Money Pot Name"
            />
            <Form.Control
              className="money-pot-card-container__input"
              type="number"
              name="moneyPotValue"
              placeholder="Your Money Pot Target"
            />
          </Form.Group>
          <Button variant="primary">Add Money Pot</Button>
        </Form>
        <Container className="money-pot-card-container__list">
        <Row className="money-pot-card-container__list-row">
        <Col>
        <ListGroup>
        <ListGroup.Item>Cras justo odio</ListGroup.Item>
        <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
        <ListGroup.Item>Morbi leo risus</ListGroup.Item>
        <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
        <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
        <ListGroup.Item>Cras justo odio</ListGroup.Item>
        <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
        <ListGroup.Item>Morbi leo risus</ListGroup.Item>
        <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
        <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
      </ListGroup>
        </Col>
        </Row>
        </Container>
      </Card.Body>
    </Card>
    </Row>
    </Container>
  );
}

export default WeeklyBudget;
