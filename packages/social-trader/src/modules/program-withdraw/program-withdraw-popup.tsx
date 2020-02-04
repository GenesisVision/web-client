import { DialogBottom } from "components/dialog/dialog-bottom";
import { DialogInfo } from "components/dialog/dialog-info";
import { withBlurLoader } from "decorators/with-blur-loader";
import { ProgramWithdrawInfo } from "gv-api-web";
import { useGetRate } from "hooks/get-rate.hook";
import useTab from "hooks/tab.hook";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { CurrencyEnum } from "utils/types";

import ProgramWithdrawAmountForm, {
  IProgramWithdrawAmountFormValues
} from "./program-withdraw-amount-form";
import { ProgramWithdrawConfirm } from "./program-withdraw-confirm-form";
import ProgramWithdrawTop from "./program-withdraw-top";

enum PROGRAM_WITHDRAW_FORM {
  ENTER_AMOUNT = "ENTER_AMOUNT",
  CONFIRM = "CONFIRM"
}

const _ProgramWithdrawPopup: React.FC<Props> = ({
  onApply,
  id,
  onClose,
  data: { availableToWithdraw, periodEnds, title, isOwner },
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
      <DialogBottom>
        {tab === PROGRAM_WITHDRAW_FORM.ENTER_AMOUNT && (
          <ProgramWithdrawAmountForm
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
              onApply={onApply}
              id={id}
              onClose={onClose}
              formValues={formValues}
              onBackClick={handleGoToEnterAmountStep}
              programCurrency={assetCurrency}
              periodEnds={periodEnds}
            />
          )}
        <DialogInfo>{t("withdraw-program.info")}</DialogInfo>
      </DialogBottom>
    </>
  );
};

const ProgramWithdrawPopup = withBlurLoader(React.memo(_ProgramWithdrawPopup));
export default ProgramWithdrawPopup;

interface Props extends OwnProps, IProgramWithdrawPopupProps {}

interface OwnProps {
  data: ProgramWithdrawInfo;
}

export interface IProgramWithdrawPopupProps {
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
