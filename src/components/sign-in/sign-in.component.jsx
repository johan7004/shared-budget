import React from "react";
import {Button} from "react-bootstrap";
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
  const handleSignInGoogle = async () => {
    await signInWithGooglePopup();
  };

  return (
    <div className="sign-in__container">
      <Button variant="primary" type="submit" onClick={handleSignInGoogle}>
        Sign In With Google
      </Button>
    </div>
  );
}

export default SignInForm;
