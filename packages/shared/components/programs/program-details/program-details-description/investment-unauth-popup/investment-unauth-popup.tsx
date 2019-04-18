import "./investment-unauth-popup.scss";

import classnames from "classnames";
import { GVButton } from "gv-react-components";
import React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { compose } from "redux";
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
  message,
  t
}) => {
  const role = process.env.REACT_APP_INVESTOR_PORTAL_URL;

  const loginUrl = role ? `${role}${LOGIN_ROUTE}` : LOGIN_ROUTE;
  const signUpUrl = role ? `${role}${SIGNUP_ROUTE}` : SIGNUP_ROUTE;

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
            <GVButton>{t("auth.login.title")}</GVButton>
          </a>
          <a href={signUpUrl}>
            <GVButton>{t("auth.signup.title")}</GVButton>
          </a>
        </div>
      </div>
    </Dialog>
  );
};

export default compose<React.FC<OwnProps>>(translate())(InvestmentUnauthPopup);

interface OwnProps extends DepositTopProps, IDialogProps {
  message: string;
}

interface Props extends OwnProps, InjectedTranslateProps {}
