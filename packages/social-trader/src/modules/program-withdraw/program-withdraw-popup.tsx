import { DialogBottom } from "components/dialog/dialog-bottom";
import { DialogInfo } from "components/dialog/dialog-info";
import { withBlurLoader } from "decorators/with-blur-loader";
import { ProgramWithdrawInfo } from "gv-api-web";
import { useGetRate } from "hooks/get-rate.hook";
import useTab from "hooks/tab.hook";
import { IProgramWithdrawAmountFormValues } from "modules/program-withdraw/program-withdraw.helpers";
import InvestDefaultPopupContainer from "pages/invest/invest-default-popup-container";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { CurrencyEnum } from "utils/types";

import ProgramWithdrawAmountForm from "./program-withdraw-amount-form";
import { ProgramWithdrawConfirm } from "./program-withdraw-confirm-form";
import ProgramWithdrawTop from "./program-withdraw-top";

enum PROGRAM_WITHDRAW_FORM {
  ENTER_AMOUNT = "ENTER_AMOUNT",
  CONFIRM = "CONFIRM"
}

interface Props extends OwnProps, IProgramWithdrawPopupProps { }

interface OwnProps {
  data: ProgramWithdrawInfo;
}

export interface IProgramWithdrawPopupProps {
  GM?: boolean;
  isProcessingRealTime?: boolean;
  onApply?: VoidFunction;
  id: string;
  onClose: (param?: any) => void;
  assetCurrency: CurrencyEnum;
  accountCurrency: CurrencyEnum;
}

export type ProgramWithdrawType = {
  amount: number;
  withdrawAll?: boolean;
};

const _ProgramWithdrawPopup: React.FC<Props> = ({
  GM,
  isProcessingRealTime,
  onApply,
  id,
  onClose,
  data: { withdrawInPercent, availableToWithdraw, periodEnds, title, isOwner },
  assetCurrency,
  accountCurrency
}) => {
  const { rate, getRate } = useGetRate();
  useEffect(() => {
    getRate({ from: assetCurrency, to: accountCurrency });
  }, [assetCurrency, accountCurrency]);
  const [t] = useTranslation();
  const { tab, setTab } = useTab<PROGRAM_WITHDRAW_FORM>(
    PROGRAM_WITHDRAW_FORM.ENTER_AMOUNT
  );
  const [
    formValues,
    setFormValues
  ] = useState<IProgramWithdrawAmountFormValues>({
    amount: "",
    withdrawAll: false
  });

  const handleEnterAmountSubmit = useCallback(
    (values: IProgramWithdrawAmountFormValues) => {
      setFormValues(values);
      setTab(null, PROGRAM_WITHDRAW_FORM.CONFIRM);
    },
    []
  );

  const handleGoToEnterAmountStep = useCallback(() => {
    setTab(null, PROGRAM_WITHDRAW_FORM.ENTER_AMOUNT);
  }, []);

  const isAvailableProgramConfirmForm =
    formValues.amount || formValues.withdrawAll;

  const time = withdrawInPercent
    ? new Date(periodEnds).toUTCString()
    : t("withdraw-program.end");

  const infoMessage = t("withdraw-program.info", {
    time
  });

  return (
    <>
      {/* <InvestDefaultPopupContainer form={} /> */}
      <ProgramWithdrawTop
        rate={rate}
        title={title}
        availableToWithdraw={availableToWithdraw}
        programCurrency={assetCurrency}
        accountCurrency={accountCurrency}
      />
      <DialogBottom>
        {tab === PROGRAM_WITHDRAW_FORM.ENTER_AMOUNT && (
          <ProgramWithdrawAmountForm
            GM={GM}
            withdrawInPercent={withdrawInPercent}
            isOwner={isOwner}
            formValues={formValues}
            rate={rate}
            programCurrency={assetCurrency}
            accountCurrency={accountCurrency}
            availableToWithdraw={availableToWithdraw}
            onSubmit={handleEnterAmountSubmit}
          />
        )}
        {tab === PROGRAM_WITHDRAW_FORM.CONFIRM &&
          isAvailableProgramConfirmForm && (
            <ProgramWithdrawConfirm
              withdrawInPercent={withdrawInPercent}
              onApply={onApply}
              id={id}
              onClose={onClose}
              formValues={formValues}
              onBackClick={handleGoToEnterAmountStep}
              programCurrency={assetCurrency}
              periodEnds={periodEnds}
            />
          )}
        {(!withdrawInPercent || !isProcessingRealTime) && (
          <DialogInfo>{infoMessage}</DialogInfo>
        )}
      </DialogBottom>
    </>
  );
};

const ProgramWithdrawPopup = withBlurLoader(React.memo(_ProgramWithdrawPopup));
export default ProgramWithdrawPopup;
