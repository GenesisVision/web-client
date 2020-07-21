import Dialog from "components/dialog/dialog";
import { DialogBottom } from "components/dialog/dialog-bottom";
import { Row } from "components/row/row";
import * as React from "react";
import { useTranslation } from "react-i18next";

import styles from "./gvt-fees.module.scss";

interface Props {
  open: boolean;
  onClose: () => void;
}

const _InvestmentLimitPopup: React.FC<Props> = ({ open, onClose }) => {
  const [t] = useTranslation();
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogBottom>
        <Row>
          <h3>{t("Without KYC you can")}</h3>
        </Row>
        <Row>
          <ul>
            <li>{t("Deposit and withdraw crypto without limits")}</li>
            <li>{t("Exchange cryptocurrencies")}</li>
            <li>{t("Create crypto trading accounts")}</li>
            <li>
              {t(
                "Create Programs (with a maximum investment amount equivalent to $1,000) and Funds"
              )}
            </li>
            <li>
              {t(
                "Bind your external trading account and use copy trading functionality (Follow)"
              )}
            </li>
            <li>{t("Invest in Programs and Funds up to $1,000 in total")}</li>
          </ul>
        </Row>
        <Row>
          <h3>{t("After you pass KYC you also can")}</h3>
        </Row>
        <Row>
          <ul>
            <li>{t("Create Forex trading accounts")}</li>
            <li>{t("Invest in Programs and Funds without limits")}</li>
            <li>
              {t("Attract investments in your Programs beyond the KYC limit")}
            </li>
          </ul>
        </Row>
        <Row>
          {t(
            "Note\n" +
              'KYC is an authentication mechanism required in the financial industry to help ensure companies are compliant with anti money laundering regulations."'
          )}
        </Row>
      </DialogBottom>
    </Dialog>
  );
};

export const InvestmentLimitPopup = React.memo(_InvestmentLimitPopup);
