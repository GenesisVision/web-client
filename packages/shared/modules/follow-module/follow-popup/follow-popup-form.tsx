import "./follow-popup.scss";

import {
  AttachToSignalProvider,
  SignalSubscription,
  SubscriptionMode,
  TradingAccountDetails,
  WalletData
} from "gv-api-web";
import React, { useCallback, useEffect, useState } from "react";
import { withBlurLoader } from "shared/decorators/with-blur-loader";
import useTab from "shared/hooks/tab.hook";
import { CurrencyEnum, SetSubmittingType } from "shared/utils/types";

import FollowCreateAccount from "./follow-popup-create-account";
import FollowParams, { FollowParamsFormValues } from "./follow-popup-params";
import FollowTop from "./follow-popup-top";
import FollowSelectAccount, {
  SelectAccountFormValues
} from "./follow-select-account";

const initRequestParams = {
  tradingAccountId: "",
  mode: "ByBalance" as SubscriptionMode,
  percent: 10,
  openTolerancePercent: 0.5,
  fixedVolume: 100,
  fixedCurrency: "USD" as CurrencyEnum
};

const _FollowForm: React.FC<Props> = ({
  data: accounts,
  id,
  wallets,
  currency,
  signalSubscription,
  minDeposit,
  rate = 1,
  submitMethod
}) => {
  const hasAccounts = !!accounts.length;
  const [tradingAccountId, setTradingAccountId] = useState<string | undefined>(
    undefined
  );
  const { tab, setTab } = useTab<TABS>(TABS.SELECT_ACCOUNT);
  const [requestParams, setRequestParams] = useState<AttachToSignalProvider>(
    initRequestParams
  );
  useEffect(() => {
    signalSubscription.hasSignalAccount && setTab(null, TABS.PARAMS);
  }, [setTab, signalSubscription.hasSignalAccount]);
  const createdCopytradingAccount = useCallback(() => {
    setTab(null, TABS.PARAMS);
    setRequestParams(requestParams);
  }, [requestParams]);
  const selectCopytradingAccount = useCallback(
    ({ account }: SelectAccountFormValues) => {
      setTab(null, TABS.PARAMS);
      setTradingAccountId(account);
    },
    []
  );
  const returnToCreateCopytradingAccount = useCallback(
    () => setTab(null, TABS.SELECT_ACCOUNT),
    []
  );
  const submit = useCallback(
    (
      {
        mode,
        openTolerancePercent,
        percent,
        fixedVolume
      }: FollowParamsFormValues,
      setSubmitting: SetSubmittingType
    ) => {
      const params = {
        ...requestParams,
        tradingAccountId: tradingAccountId!,
        mode,
        openTolerancePercent,
        percent,
        fixedVolume
      };
      setRequestParams(params);
      submitMethod(id, params, setSubmitting);
    },
    [id, requestParams, submitMethod]
  );
  const adaptStep =
    tab === TABS.SELECT_ACCOUNT
      ? hasAccounts
        ? "select-account"
        : "create-account"
      : "params";
  const paramsSubscription = signalSubscription.hasActiveSubscription
    ? signalSubscription
    : undefined;
  return (
    <>
      <FollowTop step={adaptStep} />
      {hasAccounts && tab === TABS.SELECT_ACCOUNT && (
        <FollowSelectAccount
          accounts={accounts}
          onSelect={selectCopytradingAccount}
        />
      )}
      {!hasAccounts && tab === TABS.SELECT_ACCOUNT && (
        <FollowCreateAccount
          minDeposit={minDeposit}
          wallets={wallets}
          currency={currency}
          onClick={createdCopytradingAccount}
        />
      )}
      {tab === TABS.PARAMS && (
        <FollowParams
          rate={rate}
          currency={currency}
          isShowBack={!signalSubscription.hasSignalAccount}
          paramsSubscription={paramsSubscription}
          onSubmit={submit}
          onPrevStep={returnToCreateCopytradingAccount}
        />
      )}
    </>
  );
};

enum TABS {
  SELECT_ACCOUNT = "CREATE_ACCOUNT",
  PARAMS = "PARAMS"
}

interface Props {
  data: TradingAccountDetails[];
  rate: number;
  minDeposit: number;
  signalSubscription: SignalSubscription;
  submitMethod: (
    programId: string,
    requestParams: AttachToSignalProvider,
    setSubmitting: SetSubmittingType
  ) => void;
  id: string;
  wallets: WalletData[];
  currency: CurrencyEnum;
}

const FollowForm = withBlurLoader(React.memo(_FollowForm));
export default FollowForm;
