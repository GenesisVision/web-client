import LoginLayout from "components/login-layout/login-layout";
import RegisterContainer from "modules/register-form/components/register-container";
import { LOGIN_ROUTE } from "pages/login/login.routes";
import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <LoginLayout>
      <h1>Sign up</h1>
      <RegisterContainer />
      <div className="sign-up">
        <Link to={LOGIN_ROUTE} className="sign-up__desc">
          Do you have account?
        </Link>
      </div>
    </LoginLayout>
  );
};

export default Signup;
