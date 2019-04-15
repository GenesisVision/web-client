import "./investment-unauth-popup.scss";

import classnames from "classnames";
import { ProgramDetailsFull } from "gv-api-web";
import { GVButton } from "gv-react-components";
import React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { compose } from "redux";
import DepositTop from "shared/components/deposit/components/deposit-top";
import Dialog from "shared/components/dialog/dialog";
import { ASSET, ROLE } from "shared/constants/constants";
import { LOGIN_ROUTE, SIGNUP_ROUTE } from "shared/pages/login.routes";

const _InvestmentUnauthPopup: React.FC<Props> = ({
  open,
  onClose,
  description,
  isAuthenticated,
  t
}) => {
  const role = process.env.REACT_APP_PLATFORM as ROLE;
  const isOwnProgram = description.personalProgramDetails
    ? description.personalProgramDetails.isOwnProgram
    : false;
  let message = t(
    "To invest in the selected program/fund selected please login as an investor or create a new investor account."
  );

  if (isAuthenticated && role === ROLE.MANAGER && !isOwnProgram) {
    message = t(
      "In order to invest in investment programs and funds of other managers please login as an investor or create a new investor account."
    );
  }
  const loginUrl = process.env.REACT_APP_INVESTOR_PORTAL_URL
    ? `${process.env.REACT_APP_INVESTOR_PORTAL_URL}${LOGIN_ROUTE}`
    : LOGIN_ROUTE;

  const signUpUrl = process.env.REACT_APP_INVESTOR_PORTAL_URL
    ? `${process.env.REACT_APP_INVESTOR_PORTAL_URL}${SIGNUP_ROUTE}`
    : SIGNUP_ROUTE;

  return (
    <Dialog open={open} onClose={onClose}>
      <DepositTop
        asset={ASSET.PROGRAM}
        role={role}
        currency={description.currency}
        title={description.title}
        availableToInvestBase={description.availableInvestmentBase}
      />
      <div className={classnames("dialog__bottom", "unauth-popup")}>
        <p className="unauth-popup__message">{message}</p>
        <div className="unauth-popup__links">
          <a href={loginUrl}>
            <GVButton>login</GVButton>
          </a>
          <a href={signUpUrl}>
            <GVButton>signup</GVButton>
          </a>
        </div>
      </div>
    </Dialog>
  );
};

const InvestmentUnauthPopup = compose<React.FC<OwnProps>>(translate())(
  _InvestmentUnauthPopup
);

export default InvestmentUnauthPopup;

interface OwnProps {
  open: boolean;
  onClose: () => void;
  description: ProgramDetailsFull;
  isAuthenticated: boolean;
}

interface Props extends InjectedTranslateProps, OwnProps {}
