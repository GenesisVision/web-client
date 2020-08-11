import { Button } from "components/button/button";
import DepositTop, {
  DepositTopOwnProps
} from "components/deposit/components/deposit-top";
import Dialog, { IDialogProps } from "components/dialog/dialog";
import { DialogBottom } from "components/dialog/dialog-bottom";
import { DialogButtons } from "components/dialog/dialog-buttons";
import Link from "components/link/link";
import { Row } from "components/row/row";
import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "react-i18next";
import { LOGIN_ROUTE, SIGNUP_ROUTE } from "routes/app.routes";

interface Props extends DepositTopOwnProps, IDialogProps {
  message: string;
}

const _InvestmentUnauthPopup: React.FC<Props> = ({
  header,
  open,
  onClose,
  title,
  currency,
  asset,
  availableToInvest,
  message
}) => {
  const [t] = useTranslation();
  const { asPath } = useRouter();
  const redirect = `?from=${asPath}`;

  return (
    <Dialog open={open} onClose={onClose}>
      <DepositTop
        header={header}
        asset={asset}
        currency={currency}
        title={title}
        availableToInvest={availableToInvest}
      />
      <DialogBottom>
        <Row>{message}</Row>
        <DialogButtons>
          <Link title={t("buttons.login")} to={`${LOGIN_ROUTE}${redirect}`}>
            <Button>{t("buttons.login")}</Button>
          </Link>
          <Link title={t("buttons.signup")} to={SIGNUP_ROUTE}>
            <Button>{t("buttons.signup")}</Button>
          </Link>
        </DialogButtons>
      </DialogBottom>
    </Dialog>
  );
};

const InvestmentUnauthPopup = React.memo(_InvestmentUnauthPopup);
export default InvestmentUnauthPopup;
