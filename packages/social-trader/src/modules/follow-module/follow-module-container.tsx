import Dialog from "components/dialog/dialog";
import { walletsSelector } from "components/wallet/reducers/wallet.reducers";
import {
  AmountWithCurrency,
  AttachToSignalProvider,
  BrokerTradeServerType,
  SignalSubscription
} from "gv-api-web";
import useApiRequest, { TUseApiRequestProps } from "hooks/api-request.hook";
import React, { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { tradingAccountMinDepositAmountsSelector } from "reducers/platform-reducer";
import { CurrencyEnum, SetSubmittingType } from "utils/types";

import { useGetRate } from "./follow-module-container.hooks";
import FollowPopupForm from "./follow-popup/follow-popup-form";
import {
  attachToExternalSignal,
  attachToSignal,
  fetchAccounts,
  fetchExternalAccounts,
  updateAttachToSignal
} from "./services/follow-module-service";

const DEFAULT_RATE_CURRENCY = "USD";

const _FollowModuleContainer: React.FC<Props> = ({
  brokerId,
  isExternal,
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
    )!.amount;
  const wallets = useSelector(walletsSelector);

  const { data: accounts, sendRequest: getAccounts } = useApiRequest({
    request: isExternal ? fetchExternalAccounts : fetchAccounts
  });

  const { sendRequest: submitChanges } = useApiRequest(
    composeApiRequest(signalSubscription.hasActiveSubscription, isExternal)
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
      submitChanges(
        {
          id,
          requestParams: {
            ...requestParams,
            brokerAccountTypeId: brokerId
          },
          brokerType: broker
        },
        setSubmitting
      )
        .then(onApply)
        .then(onClose);
    },
    []
  );
  return (
    <Dialog open={open} onClose={onClose}>
      <FollowPopupForm
        isExternal={isExternal}
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
  hasActiveSubscription: boolean,
  isExternal: boolean
): TUseApiRequestProps => {
  const successMessage = hasActiveSubscription
    ? "follow-program.edit-success-alert-message"
    : "follow-program.create-success-alert-message";
  const request = hasActiveSubscription
    ? updateAttachToSignal
    : isExternal
    ? attachToExternalSignal
    : attachToSignal;
  return { successMessage, request };
};

interface Props {
  isExternal: boolean;
  brokerId: string;
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
