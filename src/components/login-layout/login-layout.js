import "./login-layout.scss";

import GvBrand from "components/gv-brand/gv-brand";
import GvLogo from "components/gv-logo/gv-logo";
import React from "react";
import { translate } from "react-i18next";

const LoginLayout = ({ t, children }) => {
  return (
    <div className={"login page"}>
      <div className="login__left">
        <div className="login__logo">
          <GvLogo />
          <GvBrand />
        </div>
        <h2 className="login__description">{t("login-page.text")}</h2>
      </div>
      <div className="login__right">
        <div className="login__content">{children}</div>
      </div>
    </div>
  );
};

export default translate()(LoginLayout);
