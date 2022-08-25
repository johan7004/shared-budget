import React from "react";
import { Form, Button } from "react-bootstrap";
import './budget-forms.css'

export default function BudgetForms({ placeholder, type, ...otherProps }) {
  return (
    <>
      <Form>
        <Form.Group
          className="mb-3 input-forms__container"
          controlId="formBasicEmail"
        >
          <Form.Label className="input-forms__label">Email address</Form.Label>
          <Form.Control
            className="input-forms__input"
            type="email"
            placeholder="Enter email"
          />
          <Form.Text className="text-muted input-forms__forms-text">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}
