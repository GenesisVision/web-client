import "./follow-popup.scss";

import {
  AttachToSignalProvider,
  AttachToSignalProviderFixedCurrencyEnum,
  AttachToSignalProviderInitialDepositCurrencyEnum,
  AttachToSignalProviderModeEnum,
  SignalSubscription,
  WalletData
} from "gv-api-web";
import React, { useCallback, useEffect, useState } from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import withLoader, { WithLoaderProps } from "shared/decorators/with-loader";
import useTab from "shared/hooks/tab.hook";
import { CurrencyEnum, SetSubmittingType } from "shared/utils/types";

import FollowCreateAccount, {
  CreateAccountFormValues
} from "./follow-popup-create-account";
import FollowParams, { FollowParamsFormValues } from "./follow-popup-params";
import FollowTop from "./follow-popup-top";

const initRequestParams = {
  mode: "ByBalance" as AttachToSignalProviderModeEnum,
  percent: 10,
  openTolerancePercent: 0.5,
  fixedVolume: 100,
  fixedCurrency: "USD" as AttachToSignalProviderFixedCurrencyEnum,
  initialDepositCurrency: "GVT" as AttachToSignalProviderInitialDepositCurrencyEnum,
  initialDepositAmount: 0
};

const _FollowForm: React.FC<Props> = ({
  id,
  wallets,
  currency,
  signalSubscription,
  minDeposit,
  rate,
  submitMethod
}) => {
  const { tab, setTab } = useTab<TABS>(TABS.CREATE_ACCOUNT);
  const [requestParams, setRequestParams] = useState<AttachToSignalProvider>(
    initRequestParams
  );
  useEffect(() => {
    signalSubscription.hasSignalAccount && setTab(null, TABS.PARAMS);
  }, [setTab, signalSubscription.hasSignalAccount]);
  const createdCopytradingAccount = useCallback(
    ({
      initialDepositCurrency,
      initialDepositAmount
    }: CreateAccountFormValues) => {
      setTab(null, TABS.PARAMS);
      setRequestParams({
        ...requestParams,
        initialDepositCurrency,
        initialDepositAmount
      });
    },
    [requestParams, setTab]
  );
  const returnToCreateCopytradingAccount = useCallback(
    () => setTab(null, TABS.CREATE_ACCOUNT),
    [setTab]
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
  const adaptStep = tab === TABS.CREATE_ACCOUNT ? "create-account" : "params";
  const paramsSubscription = signalSubscription.hasActiveSubscription
    ? signalSubscription
    : undefined;
  return (
    <>
      <FollowTop step={adaptStep} />
      {!signalSubscription.hasSignalAccount && tab === TABS.CREATE_ACCOUNT && (
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
  CREATE_ACCOUNT = "CREATE_ACCOUNT",
  PARAMS = "PARAMS"
}

interface OwnProps {
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

export interface Props extends WithTranslation, OwnProps {}

const FollowForm = compose<React.ComponentType<OwnProps & WithLoaderProps>>(
  withLoader,
  translate(),
  React.memo
)(_FollowForm);
export default FollowForm;
