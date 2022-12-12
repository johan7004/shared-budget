import { React, useContext, useEffect } from "react";
import { Button } from "react-bootstrap";
import "./sign-in.styles.css";
import { UserContext } from "./../context/user.context";

import { signInWithGooglePopup } from "./../../utils/firebase.config";

function SignInForm({
  type,
  label,
  password,
  confirmPassword,
  placeholder,
  ...otherProps
}) {
  const { currentUser } = useContext(UserContext);
  const handleSignInGoogle = async () => {
    await signInWithGooglePopup();
  };

  useEffect(() => {
    console.log(currentUser)
    if (currentUser) {
       window.location.href = window.location.origin + '/summary';
      console.log(currentUser)
    } 
  }, [currentUser]);

  return (
    <div className="sign-in__container">
      <Button variant="primary" type="submit" onClick={handleSignInGoogle}>
        Sign In With Google
      </Button>
    </div>
  );
}

export default SignInForm;
