import { FUND_CURRENCY } from "constants/constants";
import { withBlurLoader } from "decorators/with-blur-loader";
import { useGetRate } from "hooks/get-rate.hook";
import * as React from "react";
import { useEffect, useState } from "react";
import { convertFromCurrency } from "utils/currency-converter";
import { CurrencyEnum } from "utils/types";

import { FundWithdrawInfoResponse } from "./fund-withdraw.types";
import FundWithdrawForm from "./fund-withdraw-form";
import { FundWithdrawTop } from "./fund-withdraw-top";

const _FundWithdrawPopup: React.FC<Props> = ({
  renderAssetPopup,
  infoMessage,
  errorMessage,
  onApply,
  onClose,
  data: { wallets, withdrawInfo },
  id
}) => {
  const [currency, setCurrency] = useState<CurrencyEnum>("GVT");
  const { rate, getRate, isRatePending } = useGetRate();
  useEffect(() => {
    getRate({ from: FUND_CURRENCY, to: currency });
  }, [currency]);

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
    <FundWithdrawForm
      availableToWithdraw={availableToWithdraw}
      exitFee={withdrawInfo.exitFee}
      currency={currency}
      errorMessage={errorMessage}
      infoMessage={infoMessage}
      isPending={isRatePending}
      setCurrency={setCurrency}
      initWalletId={wallets[0].id}
      onApply={onApply}
      onClose={onClose}
      id={id}
    />
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
