import Page from "components/page/page";
import WalletWithdrawConfirm from "pages/wallet/wallet-withdraw-confirm/wallet-withdraw-confirm";
import * as React from "react";
import { useTranslation } from "react-i18next";

const _WalletWithdrawConfirmPage: React.FC<Props> = ({ requestId, code }) => {
  const [t] = useTranslation();
  return (
    <Page title={t("wallet-withdraw:confirmation.page-title")}>
      <WalletWithdrawConfirm requestId={requestId} code={code} />
    </Page>
  );
};

interface Props {
  requestId: string;
  code: string;
}

export const WalletWithdrawConfirmPage = React.memo(_WalletWithdrawConfirmPage);
