import { AttachToSignalProvider, BrokerTradeServerType } from "gv-api-web";
import useApiRequest from "hooks/api-request.hook";
import { useGetRate } from "hooks/get-rate.hook";
import { walletsSelector } from "pages/wallet/reducers/wallet.reducers";
import React, { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
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
import FollowTop from "./follow-popup-top";

const DEFAULT_RATE_CURRENCY = "USD";

const _FollowPopupFormContainer: React.FC<Props> = ({
  title,
  renderAssetPopup,
  leverage,
  brokerId,
  isExternal,
  broker,
  id,
  currency,
  onClose,
  onApply = () => { }
}) => {
  const [t] = useTranslation();
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
  return renderAssetPopup(
    <FollowTop title={title} header={t("follow-program.title")} />,
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
  title: string;
  renderAssetPopup: (popupTop: JSX.Element, form: JSX.Element) => JSX.Element;
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
