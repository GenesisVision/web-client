import { DialogError } from "components/dialog/dialog-error";
import { FUND_CURRENCY } from "constants/constants";
import { withBlurLoader } from "decorators/with-blur-loader";
import { useGetRate } from "hooks/get-rate.hook";
import useTab from "hooks/tab.hook";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { convertFromCurrency } from "utils/currency-converter";
import { CurrencyEnum } from "utils/types";

import {
  FundWithDrawFormValues,
  FundWithdrawInfoResponse
} from "./fund-withdraw.types";
import FundWithdrawAmountForm from "./fund-withdraw-amount-form";
import { FundWithdrawConfirm } from "./fund-withdraw-confirm-form";
import { FundWithdrawTop } from "./fund-withdraw-top";

enum FUND_WITHDRAW_FORM {
  ENTER_AMOUNT = "ENTER_AMOUNT",
  CONFIRM = "CONFIRM"
}

const _FundWithdrawPopup: React.FC<Props> = ({
  renderAssetPopup,
  infoMessage,
  errorMessage,
  onApply,
  onClose,
  data: { wallets, withdrawInfo },
  id
}) => {
  const { tab, setTab } = useTab<FUND_WITHDRAW_FORM>(
    FUND_WITHDRAW_FORM.ENTER_AMOUNT
  );
  const [currency, setCurrency] = useState<CurrencyEnum>("GVT");
  const [percent, setPercent] = useState<number | undefined>(undefined);
  const { rate, getRate, isRatePending } = useGetRate();
  useEffect(() => {
    getRate({ from: FUND_CURRENCY, to: currency });
  }, [currency]);

  const handleEnterAmountSubmit = useCallback(
    ({ percent }: FundWithDrawFormValues) => {
      setPercent(percent);
      setTab(null, FUND_WITHDRAW_FORM.CONFIRM);
    },
    []
  );

  const goToEnterAmountStep = useCallback(() => {
    setTab(null, FUND_WITHDRAW_FORM.ENTER_AMOUNT);
  }, []);

  const availableToWithdraw = convertFromCurrency(
    withdrawInfo.availableToWithdraw,
    rate!
  );

  return renderAssetPopup(
    <FundWithdrawTop
      isPending={isRatePending}
      title={withdrawInfo.title}
      availableToWithdraw={availableToWithdraw}
      currency={currency}
    />,
    <>
      {tab === FUND_WITHDRAW_FORM.ENTER_AMOUNT && (
        <FundWithdrawAmountForm
          infoMessage={infoMessage}
          isPending={isRatePending}
          currency={currency}
          setCurrency={setCurrency}
          initWalletId={wallets[0].id}
          availableToWithdraw={availableToWithdraw}
          exitFee={withdrawInfo.exitFee}
          onSubmit={handleEnterAmountSubmit}
        />
      )}
      {tab === FUND_WITHDRAW_FORM.CONFIRM && percent !== undefined && (
        <FundWithdrawConfirm
          onApply={onApply}
          onClose={onClose}
          id={id}
          availableToWithdraw={availableToWithdraw}
          percent={percent}
          currency={currency}
          exitFee={withdrawInfo.exitFee}
          onBackClick={goToEnterAmountStep}
        />
      )}
      {errorMessage && <DialogError error={errorMessage} />}
    </>
  );
};

export const FundWithdrawPopup = withBlurLoader(React.memo(_FundWithdrawPopup));

interface Props extends IFundWithdrawPopupProps, IFundWithdrawPopupOwnProps { }

export interface IFundWithdrawPopupProps {
  renderAssetPopup: (popupTop: JSX.Element, form: JSX.Element) => JSX.Element;
  infoMessage?: string;
  errorMessage?: string;
  onApply?: VoidFunction;
  onClose: (param?: any) => void;
  id: string;
}

interface IFundWithdrawPopupOwnProps {
  data: FundWithdrawInfoResponse;
}
