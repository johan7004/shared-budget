import { React, useEffect, useState } from "react";
import { Form, Button, FloatingLabel, Row, Col } from "react-bootstrap";
import CurrencyList from "currency-list";
import "./budget-forms.css";

export default function BudgetForms({
  placeholder,
  type,
  label,
  ...otherProps
}) {
  const [currencyList, setCurrencyList] = useState();

  useEffect(() => {
    console.log(CurrencyList.getAll("en_GB"));
    setCurrencyList(CurrencyList.getAll("en_GB"));
  }, []);
  const submitHandler = (e) => {
    e.preventDefault();
    const budgetValue = e.target.elements.budget.value;
    const currencyValue= e.target.elements.currency.value
    console.log(`for submitted`);
    console.log(currencyValue);
  };
  return (
    <>
      <Form onSubmit={(e) => submitHandler(e)}>
        <Row className="g-2 input-forms__container">
          <Col md>
            <FloatingLabel controlId="floatingInputGrid" label={label}>
              <Form.Control
                type={type}
                placeholder={placeholder}
                name="budget"
              />
            </FloatingLabel>
          </Col>
          <Col md>
            <FloatingLabel
              controlId="floatingSelectGrid"
              label="Choose Currency"
            >
              <Form.Select aria-label="Floating label select example" name="currency">
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
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}
