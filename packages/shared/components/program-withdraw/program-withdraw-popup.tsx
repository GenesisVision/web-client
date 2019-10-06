import { CancelablePromise, ProgramWithdrawInfo } from "gv-api-web";
import * as React from "react";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { withBlurLoader } from "shared/decorators/with-blur-loader";
import useTab from "shared/hooks/tab.hook";
import { CurrencyEnum } from "shared/utils/types";

import ProgramWithdrawAmountForm, { IProgramWithdrawAmountFormValues } from "./program-withdraw-amount-form";
import { ProgramWithdrawConfirm } from "./program-withdraw-confirm-form";
import ProgramWithdrawTop from "./program-withdraw-top";

enum PROGRAM_WITHDRAW_FORM {
  ENTER_AMOUNT = "ENTER_AMOUNT",
  CONFIRM = "CONFIRM"
}

const _ProgramWithdrawPopup: React.FC<IProgramWithdrawPopupProps> = ({
  data: { rate, availableToWithdraw, periodEnds, title },
  assetCurrency,
  accountCurrency,
  withdraw
}) => {
  const [t] = useTranslation();
  const { tab, setTab } = useTab<PROGRAM_WITHDRAW_FORM>(
    PROGRAM_WITHDRAW_FORM.ENTER_AMOUNT
  );
  const [formValues, setFormValues] = useState<
    IProgramWithdrawAmountFormValues
  >({ amount: 0, withdrawAll: false });

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

  return (
    <>
      <ProgramWithdrawTop
        rate={rate}
        title={title}
        availableToWithdraw={availableToWithdraw}
        programCurrency={assetCurrency}
        accountCurrency={accountCurrency}
      />
      <div className="dialog__bottom">
        {tab === PROGRAM_WITHDRAW_FORM.ENTER_AMOUNT && (
          <ProgramWithdrawAmountForm
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
              withdraw={withdraw}
              formValues={formValues}
              onBackClick={handleGoToEnterAmountStep}
              programCurrency={assetCurrency}
              periodEnds={periodEnds}
            />
          )}
        <div className="dialog__info">{t("withdraw-program.info")}</div>
      </div>
    </>
  );
};

const ProgramWithdrawPopup = withBlurLoader(React.memo(_ProgramWithdrawPopup));
export default ProgramWithdrawPopup;

export interface IProgramWithdrawPopupProps {
  data: ProgramWithdrawInfo;
  assetCurrency: CurrencyEnum;
  accountCurrency: CurrencyEnum;
  withdraw: (values: ProgramWithdrawType) => CancelablePromise<void>;
}

export type ProgramWithdrawType = {
  amount: number;
  withdrawAll?: boolean;
};
