import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { FUND_CURRENCY } from "shared/constants/constants";
import { withBlurLoader } from "shared/decorators/with-blur-loader";
import useTab from "shared/hooks/tab.hook";
import { fetchRate } from "shared/services/rate-service";
import { convertFromCurrency } from "shared/utils/currency-converter";
import { CurrencyEnum } from "shared/utils/types";

import FundWithdrawAmountForm, { FundWithDrawFormValues } from "./fund-withdraw-amount-form";
import { FundWithdrawConfirm } from "./fund-withdraw-confirm-form";
import { FundWithdrawTop } from "./fund-withdraw-top";
import { FundWithdraw, FundWithdrawalInfoResponse } from "./fund-withdraw.types";

enum FUND_WITHDRAW_FORM {
  ENTER_AMOUNT = "ENTER_AMOUNT",
  CONFIRM = "CONFIRM"
}

const _FundWithdrawPopup: React.FC<Props> = ({
  data: { wallets, withdrawalInfo },
  accountCurrency,
  withdraw
}) => {
  const { tab, setTab } = useTab<FUND_WITHDRAW_FORM>(
    FUND_WITHDRAW_FORM.ENTER_AMOUNT
  );
  const [rate, setRate] = useState<number>(1);
  const [currency, setCurrency] = useState<CurrencyEnum>(accountCurrency);
  const [percent, setPercent] = useState<number | undefined>(undefined);

  useEffect(
    () => {
      fetchRate(FUND_CURRENCY, currency).then(setRate);
    },
    [currency]
  );

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
    withdrawalInfo.availableToWithdraw,
    rate
  );

  return (
    <>
      <FundWithdrawTop
        title={withdrawalInfo.title}
        availableToWithdraw={availableToWithdraw}
        currency={currency}
      />
      <div className="dialog__bottom">
        {tab === FUND_WITHDRAW_FORM.ENTER_AMOUNT && (
          <FundWithdrawAmountForm
            currency={currency}
            setCurrency={setCurrency}
            wallets={wallets}
            availableToWithdraw={availableToWithdraw}
            exitFee={withdrawalInfo.exitFee}
            onSubmit={handleEnterAmountSubmit}
          />
        )}
        {tab === FUND_WITHDRAW_FORM.CONFIRM && percent !== undefined && (
          <FundWithdrawConfirm
            withdraw={withdraw}
            availableToWithdraw={availableToWithdraw}
            percent={percent}
            currency={currency}
            exitFee={withdrawalInfo.exitFee}
            onBackClick={goToEnterAmountStep}
          />
        )}
      </div>
    </>
  );
};

export const FundWithdrawPopup = withBlurLoader(React.memo(_FundWithdrawPopup));

interface Props extends IFundWithdrawPopupProps, IFundWithdrawPopupOwnProps {}

export interface IFundWithdrawPopupProps {
  accountCurrency: CurrencyEnum;
  withdraw: (value: FundWithdraw) => Promise<void>;
}

interface IFundWithdrawPopupOwnProps {
  data: FundWithdrawalInfoResponse;
}
