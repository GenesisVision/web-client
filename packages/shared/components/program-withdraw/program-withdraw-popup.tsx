import { ProgramWithdrawInfo } from "gv-api-web";
import * as React from "react";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import withLoader from "shared/decorators/with-loader";
import useErrorMessage from "shared/hooks/error-message.hook";
import useTab from "shared/hooks/tab.hook";
import { SetSubmittingType } from "shared/utils/types";

import ProgramWithdrawAmountForm, {
  IProgramWithdrawAmountFormValues
} from "./program-withdraw-amount-form";
import ProgramWithdrawConfirmForm from "./program-withdraw-confirm-form";
import ProgramWithdrawTop from "./program-withdraw-top";

enum PROGRAM_WITHDRAW_FORM {
  ENTER_AMOUNT = "ENTER_AMOUNT",
  CONFIRM = "CONFIRM"
}

const _ProgramWithdrawPopup: React.FC<IProgramWithdrawPopupProps> = ({
  programWithdrawInfo: { rate, availableToWithdraw, periodEnds, title },
  assetCurrency,
  accountCurrency,
  fetchInfo,
  withdraw
}) => {
  const [t] = useTranslation();
  const { tab, setTab } = useTab<PROGRAM_WITHDRAW_FORM>(
    PROGRAM_WITHDRAW_FORM.ENTER_AMOUNT
  );
  const {
    errorMessage,
    setErrorMessage,
    cleanErrorMessage
  } = useErrorMessage();
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [withdrawAll, setWithdrawAll] = useState<boolean>(false);

  const handleSubmit = useCallback(
    (setSubmitting: SetSubmittingType) =>
      withdraw({
        amount: amount || 0,
        withdrawAll
      })
        .catch(setErrorMessage)
        .finally(() => setSubmitting(false)),
    [amount, withdrawAll]
  );

  const handleEnterAmountSubmit = useCallback(
    ({ amount, withdrawAll }: IProgramWithdrawAmountFormValues) => {
      setTab(null, PROGRAM_WITHDRAW_FORM.CONFIRM);
      setAmount(amount);
      setWithdrawAll(!!withdrawAll);
    },
    []
  );

  const handleGoToEnterAmountStep = useCallback(() => {
    setTab(null, PROGRAM_WITHDRAW_FORM.ENTER_AMOUNT);
    cleanErrorMessage();
  }, []);

  const isAvailableProgramConfirmForm = amount || withdrawAll;
  return (
    <>
      <ProgramWithdrawTop
        title={title}
        availableToWithdraw={availableToWithdraw}
        programCurrency={assetCurrency}
      />
      <div className="dialog__bottom">
        {tab === PROGRAM_WITHDRAW_FORM.ENTER_AMOUNT && (
          <ProgramWithdrawAmountForm
            amount={amount}
            withdrawAll={withdrawAll}
            rate={rate}
            programCurrency={assetCurrency}
            accountCurrency={accountCurrency}
            availableToWithdraw={availableToWithdraw}
            onSubmit={handleEnterAmountSubmit}
          />
        )}
        {tab === PROGRAM_WITHDRAW_FORM.CONFIRM &&
          isAvailableProgramConfirmForm && (
            <ProgramWithdrawConfirmForm
              errorMessage={errorMessage}
              amount={amount}
              withdrawAll={withdrawAll}
              onSubmit={handleSubmit}
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

const ProgramWithdrawPopup = withLoader(React.memo(_ProgramWithdrawPopup));

export default ProgramWithdrawPopup;

export interface IProgramWithdrawPopupProps {
  programWithdrawInfo: ProgramWithdrawInfo;
  assetCurrency: string;
  accountCurrency: string;
  fetchInfo: () => Promise<ProgramWithdrawInfo>;
  withdraw: (values: ProgramWithdrawType) => Promise<void>;
}

export type ProgramWithdrawType = {
  amount: number;
  withdrawAll?: boolean;
};
