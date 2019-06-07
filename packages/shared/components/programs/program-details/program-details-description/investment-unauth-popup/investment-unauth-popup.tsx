import "./investment-unauth-popup.scss";

import classnames from "classnames";
import React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { compose } from "redux";
import DepositTop, {
  DepositTopOwnProps
} from "shared/components/deposit/components/deposit-top";
import Dialog, { IDialogProps } from "shared/components/dialog/dialog";
import GVButton from "shared/components/gv-button";
import { ROLE } from "shared/constants/constants";
import withRole, { WithRoleProps } from "shared/decorators/with-role";
import { LOGIN_ROUTE, SIGNUP_ROUTE } from "shared/pages/login.routes";

const InvestmentUnauthPopup: React.FC<Props> = ({
  role,
  open,
  onClose,
  title,
  currency,
  asset,
  availableToInvestBase,
  message,
  t
}) => {
  const baseUrl =
    role === ROLE.MANAGER
      ? process.env.REACT_APP_INVESTOR_PORTAL_URL
      : process.env.NODE_ENV === "development"
      ? ``
      : `/${ROLE.INVESTOR}`;

  const loginUrl = `${baseUrl}${LOGIN_ROUTE}`;
  const signUpUrl = `${baseUrl}${SIGNUP_ROUTE}`;

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

export default compose<React.FC<OwnProps>>(
  withRole,
  translate(),
  React.memo
)(InvestmentUnauthPopup);

interface OwnProps extends DepositTopOwnProps, IDialogProps {
  message: string;
}

interface Props extends OwnProps, InjectedTranslateProps, WithRoleProps {}
