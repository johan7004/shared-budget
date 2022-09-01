import React from "react";
import { Form, Button, FloatingLabel } from "react-bootstrap";
import "./sign-in.styles.css";

import { signInWithGooglePopup } from "./../../utils/firebase.config";

function SignInForm({
  type,
  label,
  password,
  confirmPassword,
  placeholder,
  ...otherProps
}) {
  const handleSignInSubmit = async () => {
    await signInWithGooglePopup();
  };
  return (
    <div className="sign-in__container">
      <Form>
        <FloatingLabel
          controlId="floatingInput"
          label="Email address"
          className="mb-3"
        >
          <Form.Control type="email" placeholder="name@example.com" />
        </FloatingLabel>
        <FloatingLabel controlId="floatingPassword" label="Password">
          <Form.Control type="password" placeholder="Password" />
        </FloatingLabel>
      </Form>
        <Button variant="primary" type="submit" onClick={handleSignInSubmit}>
          Submit
        </Button>
    </div>
  );
}

export default SignInForm;
