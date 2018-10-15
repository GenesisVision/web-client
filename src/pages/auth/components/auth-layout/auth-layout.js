import "./auth-layout.scss";

import GvBrand from "components/gv-brand/gv-brand";
import GvLogo from "components/gv-logo/gv-logo";
import { PROGRAMS_ROUTE } from "pages/programs/programs.routes";
import PropTypes from "prop-types";
import React from "react";
import { translate } from "react-i18next";
import { NavLink } from "react-router-dom";

const AuthLayout = ({ t, children, title, Footer }) => {
  return (
    <div className={"auth page"}>
      <div className="auth__left">
        <NavLink
          className="navigation__link auth__logo"
          activeClassName="navigation__link--active"
          to={PROGRAMS_ROUTE}
        >
          <GvLogo />
          <GvBrand />
        </NavLink>
        <h2 className="auth__description">{t("auth.text")}</h2>
      </div>
      <div className="auth__right">
        <div className="auth__content">
          {title && <h1 className="auth__title">{title}</h1>}
          {children}
        </div>
        {Footer && (
          <div className="auth__footer">
            <Footer />
          </div>
        )}
      </div>
    </div>
  );
};

AuthLayout.propTypes = {
  Footer: PropTypes.func,
  title: PropTypes.string
};

export default translate()(AuthLayout);
