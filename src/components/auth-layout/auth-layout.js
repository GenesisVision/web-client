import "./auth-layout.scss";

import GvBrand from "components/gv-brand/gv-brand";
import GvLogo from "components/gv-logo/gv-logo";
import React from "react";
import { translate } from "react-i18next";

const AuthLayout = ({ t, children, Footer }) => {
  return (
    <div className={"auth page"}>
      <div className="auth__left">
        <div className="auth__logo">
          <GvLogo />
          <GvBrand />
        </div>
        <h2 className="auth__description">{t("auth.text")}</h2>
      </div>
      <div className="auth__right">
        <div className="auth__content">{children}</div>
        <div className="auth__footer">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default translate()(AuthLayout);
