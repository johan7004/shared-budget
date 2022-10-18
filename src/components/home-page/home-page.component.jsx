import { React } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./home-page.style.css";

export default function HomePage() {
  return (
    <Container className="home-page__container">
      <Row className="home-page__items">
        <Col className="promo-cards__container">
          <Card className="card-container" style={{ width: "10rem" }}>
            <Card.Body>
              <Card.Title>Set Budget like Pro</Card.Title>
            </Card.Body>
          </Card>
          <Card className="card-container" style={{ width: "10rem" }}>
            <Card.Body>
              <Card.Title className="card-container__title">Save In Money Pot</Card.Title>
            </Card.Body>
          </Card>
          <Card className="card-container" style={{ width: "10rem" }}>
            <Card.Body>
              <Card.Title className="card-container__title">Spend Like crazy</Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col className="catch-phrase__container">
          <h1 className="catch-phrase__item lineUp">Save Money</h1>
          <h1 className="catch-phrase__item lineUp--second">Track Expenses</h1>
          <h1 className="catch-phrase__item lineUp--third">Achieve Goals</h1>
        </Col>
      </Row>
    </Container>
  );
}
