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

import { useGetRate } from "../follow-module-container.hooks";
import FollowPopupForm from "../follow-popup/follow-popup-form";
import {
  attachToExternalSignal,
  attachToSignal,
  fetchAccounts,
  fetchExternalAccounts,
  updateAttachToSignal
} from "../services/follow-module-service";

const DEFAULT_RATE_CURRENCY = "USD";

const _FollowModuleContainer: React.FC<Props> = ({
  leverage,
  brokerId,
  isExternal,
  broker,
  id,
  signalSubscription,
  currency,
  onClose,
  onApply
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

  const getAccountsMethod = isExternal ? fetchExternalAccounts : fetchAccounts;
  const { data: accounts } = useApiRequest({
    request: () => getAccountsMethod({ id }),
    fetchOnMount: true
  });

  const { sendRequest: submitChanges } = useApiRequest({
    ...composeApiRequest(signalSubscription.hasActiveSubscription, isExternal),
    middleware: [onApply, onClose]
  });

  const { rate, getRate } = useGetRate();

  useEffect(() => {
    getRate({ from: DEFAULT_RATE_CURRENCY, to: currency });
  }, [currency]);

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
          leverage
        },
        setSubmitting
      );
    },
    []
  );
  return (
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
  leverage: number;
  isExternal: boolean;
  brokerId: string;
  broker: BrokerTradeServerType;
  onClose: () => void;
  onApply: () => void;
  currency: CurrencyEnum;
  id: string;
  signalSubscription: SignalSubscription;
}

const FollowPopupFormContainer = React.memo(_FollowModuleContainer);
export default FollowPopupFormContainer;
