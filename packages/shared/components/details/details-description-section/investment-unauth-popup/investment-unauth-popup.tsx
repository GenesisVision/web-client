import "./investment-unauth-popup.scss";

import React from "react";
import { useTranslation } from "react-i18next";
import DepositTop, {
  DepositTopOwnProps
} from "shared/components/deposit/components/deposit-top";
import Dialog, { IDialogProps } from "shared/components/dialog/dialog";
import { DialogBottom } from "shared/components/dialog/dialog-bottom";
import { DialogButtons } from "shared/components/dialog/dialog-buttons";
import GVButton from "shared/components/gv-button";
import { ROLE } from "shared/constants/constants";
import useRole from "shared/hooks/use-role.hook";
import { LOGIN_ROUTE, SIGNUP_ROUTE } from "shared/routes/app.routes";

const _InvestmentUnauthPopup: React.FC<Props> = ({
  header,
  open,
  onClose,
  title,
  currency,
  asset,
  availableToInvestBase,
  message
}) => {
  const [t] = useTranslation();
  const role = useRole();
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
        header={header}
        asset={asset}
        currency={currency}
        title={title}
        availableToInvestBase={availableToInvestBase}
      />
      <DialogBottom>
        <p className="unauth-popup__message">{message}</p>
        <DialogButtons>
          <a href={loginUrl}>
            <GVButton>{t("auth.login.title")}</GVButton>
          </a>
          <a href={signUpUrl}>
            <GVButton>{t("auth.signup.title")}</GVButton>
          </a>
        </DialogButtons>
      </DialogBottom>
    </Dialog>
  );
};

const InvestmentUnauthPopup = React.memo(_InvestmentUnauthPopup);
export default InvestmentUnauthPopup;

interface Props extends DepositTopOwnProps, IDialogProps {
  message: string;
}
