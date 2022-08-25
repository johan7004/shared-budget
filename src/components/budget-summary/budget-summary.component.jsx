import React from "react";
import "./budget-summary.styles.css";
import { Link } from "react-router-dom";
import { Row, Container, Col, Card, Button } from "react-bootstrap";

export default function BudgetSummary() {
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
              <Card.Text>For This Wekk : 20 leva</Card.Text>
              <Card.Text>5 Days Remaining For Reset</Card.Text>
              <Card.Text>Total Balance Left: 1500 leva</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col className="card-container">
          <Card className="card-container__item" style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>Categories Of Expense</Card.Title>
              <Card.Text>Spent Date : 20 leva</Card.Text>
              <Card.Text>Spent Date : 20 leva</Card.Text>
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
