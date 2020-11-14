import { AttachToSignalProvider, BrokerTradeServerType } from "gv-api-web";
import useApiRequest from "hooks/api-request.hook";
import { useGetRate } from "hooks/get-rate.hook";
import { walletsSelector } from "pages/wallet/reducers/wallet.reducers";
import React, { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { tradingAccountMinDepositAmountsSelector } from "reducers/platform-reducer";
import { sendEventToGA } from "utils/ga";
import { postponeCallback } from "utils/hook-form.helpers";
import { CurrencyEnum } from "utils/types";

import FollowPopupForm from "../follow-popup/follow-popup-form";
import {
  attachToExternalSignal,
  attachToSignal,
  fetchAccounts,
  fetchExternalAccounts,
  getMinDeposit
} from "../services/follow-module-service";

const DEFAULT_RATE_CURRENCY = "USD";

const _FollowPopupFormContainer: React.FC<Props> = ({
  leverage,
  brokerId,
  isExternal,
  broker,
  id,
  currency,
  onClose,
  onApply = () => {}
}) => {
  useEffect(() => {
    sendEventToGA({ eventCategory: "Button", eventAction: "ClickFollow" });
  }, []);
  const tradingAccountMinDepositAmounts = useSelector(
    tradingAccountMinDepositAmountsSelector
  );
  const wallets = useSelector(walletsSelector);

  const minDeposit = getMinDeposit({
    isExternal,
    tradingAccountMinDepositAmounts,
    broker,
    currency
  });

  const sendEventMiddleware = () => {
    sendEventToGA({
      eventCategory: "Button",
      eventAction: "FollowTo"
    });
  };

  const getAccountsMethod = isExternal ? fetchExternalAccounts : fetchAccounts;
  const { data: accounts } = useApiRequest({
    name: "FollowPopupFormContainer",
    cache: true,
    request: () => getAccountsMethod({ id }),
    fetchOnMount: true
  });

  const { sendRequest: submitChanges, errorMessage } = useApiRequest({
    successMessage: "follow-program.create-success-alert-message",
    request: getApiRequest(isExternal),
    middleware: [
      postponeCallback(() => {
        onClose();
        onApply();
      }),
      sendEventMiddleware
    ]
  });

  const { rate, getRate } = useGetRate();

  useEffect(() => {
    getRate({ from: DEFAULT_RATE_CURRENCY, to: currency });
  }, [currency]);

  const handleSubmit = useCallback(
    (id: string, requestParams: AttachToSignalProvider) => {
      return submitChanges({
        id,
        requestParams: {
          ...requestParams,
          brokerAccountTypeId: brokerId
        },
        leverage
      });
    },
    []
  );
  return (
    <FollowPopupForm
      errorMessage={errorMessage}
      isExternal={isExternal}
      rate={rate}
      loaderData={[]}
      minDeposit={minDeposit!}
      id={id}
      currency={currency}
      data={accounts!}
      wallets={wallets}
      submitMethod={handleSubmit}
    />
  );
};

const getApiRequest = (isExternal: boolean) =>
  isExternal ? attachToExternalSignal : attachToSignal;

interface Props {
  leverage: number;
  isExternal: boolean;
  brokerId: string;
  broker: BrokerTradeServerType;
  onClose: () => void;
  onApply?: () => void;
  currency?: CurrencyEnum;
  id: string;
}

const FollowPopupFormContainer = React.memo(_FollowPopupFormContainer);
export default FollowPopupFormContainer;
