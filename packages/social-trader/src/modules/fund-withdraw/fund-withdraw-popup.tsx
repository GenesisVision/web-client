import { DialogBottom } from "components/dialog/dialog-bottom";
import { withBlurLoader } from "decorators/with-blur-loader";
import useApiRequest from "hooks/api-request.hook";
import useTab from "hooks/tab.hook";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { fetchRate } from "services/rate-service";
import { FUND_CURRENCY } from "shared/constants/constants";
import { convertFromCurrency } from "shared/utils/currency-converter";
import { CurrencyEnum } from "utils/types";

import FundWithdrawAmountForm, {
  FundWithDrawFormValues
} from "./fund-withdraw-amount-form";
import { FundWithdrawConfirm } from "./fund-withdraw-confirm-form";
import { FundWithdrawTop } from "./fund-withdraw-top";
import { FundWithdrawInfoResponse } from "./fund-withdraw.types";

enum FUND_WITHDRAW_FORM {
  ENTER_AMOUNT = "ENTER_AMOUNT",
  CONFIRM = "CONFIRM"
}

const _FundWithdrawPopup: React.FC<Props> = ({
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
  const { isPending, sendRequest: getRate, data: rate = 1 } = useApiRequest<
    number
  >({
    request: ({ from, to }) => fetchRate(from, to)
  });

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

  return (
    <>
      <FundWithdrawTop
        isPending={isPending}
        title={withdrawInfo.title}
        availableToWithdraw={availableToWithdraw}
        currency={currency}
      />
      <DialogBottom>
        {tab === FUND_WITHDRAW_FORM.ENTER_AMOUNT && (
          <FundWithdrawAmountForm
            isPending={isPending}
            currency={currency}
            setCurrency={setCurrency}
            wallets={wallets}
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
      </DialogBottom>
    </>
  );
};

export const FundWithdrawPopup = withBlurLoader(React.memo(_FundWithdrawPopup));

interface Props extends IFundWithdrawPopupProps, IFundWithdrawPopupOwnProps {}

export interface IFundWithdrawPopupProps {
  onApply?: VoidFunction;
  onClose: (param?: any) => void;
  id: string;
}

interface IFundWithdrawPopupOwnProps {
  data: FundWithdrawInfoResponse;
}
