import { DialogBottom } from "components/dialog/dialog-bottom";
import { DialogTop } from "components/dialog/dialog-top";
import useApiRequest from "hooks/api-request.hook";
import DemoDepositForm from "modules/demo-deposit/demo-deposit.form";
import {
  DemoDepositResponse,
  depositToDemo
} from "modules/demo-deposit/demo-deposit.service";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { postponeCallback } from "utils/hook-form.helpers";
import { CurrencyEnum } from "utils/types";

const _DemoDepositContainer: React.FC<IDemoDepositContainerProps> = ({
  currentDeposit,
  onApply,
  id,
  currency
}) => {
  const [t] = useTranslation();
  const onApplyMiddleware = postponeCallback(onApply);
  const { sendRequest, errorMessage } = useApiRequest<DemoDepositResponse>({
    request: depositToDemo,
    successMessage: t("transfer.confirmation.deposit-success"),
    middleware: [onApplyMiddleware]
  });
  const handleSubmit = useCallback(values => {
    return (sendRequest({ ...values, id }) as unknown) as DemoDepositResponse;
  }, []);

  return (
    <>
      <DialogTop
        title={t("transfer.deposit-to", {
          title: t(`dashboard-page.trading.asset-types.TradingAccount`)
        })}
      />
      <DialogBottom>
        <DemoDepositForm
          currentDeposit={currentDeposit}
          errorMessage={errorMessage}
          currency={currency}
          onSubmit={handleSubmit}
        />
      </DialogBottom>
    </>
  );
};

export interface IDemoDepositContainerProps {
  currentDeposit: number;
  onApply?: VoidFunction;
  currency: CurrencyEnum;
  id: string;
}

const DemoDepositContainer = React.memo(_DemoDepositContainer);
export default DemoDepositContainer;
