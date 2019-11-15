import {
  AmountWithCurrency,
  AttachToSignalProvider,
  BrokerTradeServerType,
  SignalSubscription
} from "gv-api-web";
import React, { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import Dialog from "shared/components/dialog/dialog";
import { walletsSelector } from "shared/components/wallet/reducers/wallet.reducers";
import useApiRequest, {
  TUseApiRequestProps
} from "shared/hooks/api-request.hook";
import { CurrencyEnum, SetSubmittingType } from "shared/utils/types";

import { tradingAccountMinDepositAmountsSelector } from "../../reducers/platform-reducer";
import { useGetRate } from "./follow-module-container.hooks";
import FollowPopupForm from "./follow-popup/follow-popup-form";
import {
  attachToSignal,
  fetchAccounts,
  updateAttachToSignal
} from "./services/follow-module-service";

const DEFAULT_RATE_CURRENCY = "USD";

const _FollowModuleContainer: React.FC<Props> = ({
  broker,
  id,
  signalSubscription,
  currency,
  onClose,
  onApply,
  open
}) => {
  const tradingAccountMinDepositAmounts = useSelector(
    tradingAccountMinDepositAmountsSelector
  );
  const minDeposit = tradingAccountMinDepositAmounts
    .find(({ serverType }) => serverType === broker)!
    .minDepositCreateAsset.find(
      (minDeposit: AmountWithCurrency) => minDeposit.currency === currency
    ).amount;
  const wallets = useSelector(walletsSelector);

  const { data: accounts, sendRequest: getAccounts } = useApiRequest({
    request: fetchAccounts
  });

  const { sendRequest: submitChanges } = useApiRequest(
    composeApiRequest(signalSubscription.hasActiveSubscription)
  );

  const { rate, getRate } = useGetRate();

  useEffect(() => {
    open &&
      getAccounts({ id }) &&
      getRate({ from: DEFAULT_RATE_CURRENCY, to: currency });
  }, [open]);

  const handleSubmit = useCallback(
    (
      id: string,
      requestParams: AttachToSignalProvider,
      setSubmitting: SetSubmittingType
    ) => {
      submitChanges({ id, requestParams }, setSubmitting)
        .then(onApply)
        .then(onClose);
    },
    []
  );
  return (
    <Dialog open={open} onClose={onClose}>
      <FollowPopupForm
        rate={rate}
        loaderData={[]}
        signalSubscription={signalSubscription}
        minDeposit={minDeposit!}
        id={id}
        currency={currency}
        data={accounts}
        wallets={wallets}
        submitMethod={handleSubmit}
      />
    </Dialog>
  );
};

const composeApiRequest = (
  hasActiveSubscription: boolean
): TUseApiRequestProps => {
  const successMessage = hasActiveSubscription
    ? "follow-program.edit-success-alert-message"
    : "follow-program.create-success-alert-message";
  const request = hasActiveSubscription ? updateAttachToSignal : attachToSignal;
  return { successMessage, request };
};

interface Props {
  broker: BrokerTradeServerType;
  open: boolean;
  onClose: () => void;
  onApply: () => void;
  currency: CurrencyEnum;
  id: string;
  signalSubscription: SignalSubscription;
}

const FollowModuleContainer = React.memo(_FollowModuleContainer);
export default FollowModuleContainer;
