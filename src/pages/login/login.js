import "./login.scss";

import GenesisVision from "components/genesis-vision/genesis-vision";
import Logo from "components/logo/logo";
import Page from "components/page/page";
import { GVButton } from "gv-react-components";
import LoginRoutes from "pages/login/login.routes";
import React from "react";

const Login = () => {
  return (
    <Page className={"login"} title={"Login"}>
      <div className="login__left">
        <div className="login__logo">
          <Logo />
          <GenesisVision />
        </div>
        <h2 className="login__description">
          A Brief History<br /> Of Creation
        </h2>
      </div>
      <div className="login__right">
        <h1 className="login__header">Login</h1>
        <div className="tab-list login__tabs">
          <span className={"tab-list__item tab-list__item--active"}>
            Investor
          </span>
          <span className={"tab-list__item"}>
            <a href={process.env.REACT_APP_MANAGER_PORTAL_URL}>Manager</a>
          </span>
        </div>
        <LoginRoutes />

        <div className="login__buttons">
          <GVButton variant="text" color="secondary">
            Don’t have an account?
          </GVButton>
          <GVButton variant="outlined" color="secondary">
            Sign up
          </GVButton>
        </div>
      </div>
    </Page>
  );
};

export default Login;
