import "./investment-unauth-popup.scss";

import classnames from "classnames";
import { GVButton } from "gv-react-components";
import React from "react";
import { InjectedTranslateProps } from "react-i18next";
import DepositTop, {
  DepositTopProps
} from "shared/components/deposit/components/deposit-top";
import Dialog, { IDialogProps } from "shared/components/dialog/dialog";
import { LOGIN_ROUTE, SIGNUP_ROUTE } from "shared/pages/login.routes";

const InvestmentUnauthPopup: React.FC<Props> = ({
  open,
  onClose,
  title,
  currency,
  asset,
  availableToInvestBase,
  message
}) => {
  const loginUrl = process.env.REACT_APP_INVESTOR_PORTAL_URL
    ? `${process.env.REACT_APP_INVESTOR_PORTAL_URL}${LOGIN_ROUTE}`
    : LOGIN_ROUTE;

  const signUpUrl = process.env.REACT_APP_INVESTOR_PORTAL_URL
    ? `${process.env.REACT_APP_INVESTOR_PORTAL_URL}${SIGNUP_ROUTE}`
    : SIGNUP_ROUTE;

  return (
    <Dialog open={open} onClose={onClose}>
      <DepositTop
        asset={asset}
        currency={currency}
        title={title}
        availableToInvestBase={availableToInvestBase}
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

export default InvestmentUnauthPopup;

interface Props extends DepositTopProps, IDialogProps {
  message: string;
}
