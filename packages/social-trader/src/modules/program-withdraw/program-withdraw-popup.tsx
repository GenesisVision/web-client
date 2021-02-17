import { withBlurLoader } from "decorators/with-blur-loader";
import { ProgramWithdrawInfo } from "gv-api-web";
import { useGetRate } from "hooks/get-rate.hook";
import * as React from "react";
import { useEffect } from "react";
import { CurrencyEnum } from "utils/types";

import ProgramWithdrawForm from "./program-withdraw-form";
import ProgramWithdrawTop from "./program-withdraw-top";

interface Props extends OwnProps, IProgramWithdrawPopupProps { }

interface OwnProps {
  data: ProgramWithdrawInfo;
}

export interface IProgramWithdrawPopupProps {
  renderAssetPopup: (popupTop: JSX.Element, form: JSX.Element) => JSX.Element;
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
  renderAssetPopup,
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

  return renderAssetPopup(
    <ProgramWithdrawTop
      rate={rate}
      title={title}
      availableToWithdraw={availableToWithdraw}
      programCurrency={assetCurrency}
      accountCurrency={accountCurrency}
    />,
    <ProgramWithdrawForm
      isProcessingRealTime={isProcessingRealTime}
      withdrawInPercent={withdrawInPercent}
      programCurrency={assetCurrency}
      GM={GM}
      isOwner={isOwner}
      rate={rate}
      accountCurrency={accountCurrency}
      availableToWithdraw={availableToWithdraw}
      onApply={onApply}
      id={id}
      onClose={onClose}
      periodEnds={periodEnds}
    />
  );
};

const ProgramWithdrawPopup = withBlurLoader(React.memo(_ProgramWithdrawPopup));
export default ProgramWithdrawPopup;
