import "./login.scss";

import GvBrand from "components/gv-brand/gv-brand";
import GvLogo from "components/gv-logo/gv-logo";
import Page from "components/page/page";
import { GVButton, GVTab, GVTabs } from "gv-react-components";
import LoginRoutes from "pages/login/login.routes";
import React from "react";

const Login = () => {
  return (
    <Page className={"login"} title={"Login"}>
      <div className="login__left">
        <div className="login__logo">
          <GvLogo />
          <GvBrand />
        </div>
        <h2 className="login__description">
          A Brief History
          <br /> Of Creation
        </h2>
      </div>
      <div className="login__right">
        <h1 className="login__header">Login</h1>
        <div className="login__tabs">
          <GVTabs value={"investor"}>
            <GVTab value={"investor"} label={"Investor"} />
            <GVTab
              value={"manager"}
              label={
                <a href={process.env.REACT_APP_MANAGER_PORTAL_URL}>Manager</a>
              }
            />
          </GVTabs>
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
