import { transformAccountWalletToCommon } from "components/wallet-select/wallet-select.helpers";
import { withBlurLoader } from "decorators/with-blur-loader";
import {
  AttachToSignalProvider,
  SubscriptionMode,
  TradingAccountDetails,
  WalletData
} from "gv-api-web";
import useTab from "hooks/tab.hook";
import FollowCreateExternalAccount from "modules/follow-module/follow-popup/follow-popup-create-external-account";
import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { subscribeFixedCurrenciesSelector } from "reducers/platform-reducer";
import { safeGetElemFromArray } from "utils/helpers";
import { CurrencyEnum } from "utils/types";

import FollowCreateAccount from "./follow-popup-create-account";
import FollowParams, { FollowParamsFormValues } from "./follow-popup-params";
import FollowTop from "./follow-popup-top";
import FollowSelectAccount from "./follow-select-account";

const initRequestParams = {
  tradingAccountId: "",
  mode: "ByBalance" as SubscriptionMode,
  percent: 10,
  openTolerancePercent: 0.5,
  fixedVolume: 100,
  fixedCurrency: "USD" as CurrencyEnum
};

enum TABS {
  SELECT_ACCOUNT = "CREATE_ACCOUNT",
  PARAMS = "PARAMS"
}

interface Props {
  errorMessage?: string;
  isExternal: boolean;
  data: TradingAccountDetails[];
  rate: number;
  minDeposit: number;
  submitMethod: (
    programId: string,
    requestParams: AttachToSignalProvider
  ) => void;
  id: string;
  wallets: WalletData[];
  currency?: CurrencyEnum;
}

const _FollowForm: React.FC<Props> = ({
  errorMessage,
  isExternal,
  data: accounts,
  id,
  wallets,
  currency,
  minDeposit,
  rate = 1,
  submitMethod
}) => {
  const subscribeFixedCurrencies = useSelector(
    subscribeFixedCurrenciesSelector
  );
  const hasAccounts = !!accounts.length;
  const [tradingAccountId, setTradingAccountId] = useState<string | undefined>(
    undefined
  );
  const { tab, setTab } = useTab<TABS>(TABS.SELECT_ACCOUNT);
  const [requestParams, setRequestParams] = useState<AttachToSignalProvider>(
    initRequestParams
  );
  const createdCopytradingAccount = useCallback(
    values => {
      setTab(null, TABS.PARAMS);
      setRequestParams({ ...requestParams, ...values });
    },
    [requestParams]
  );
  const selectCopytradingAccount = useCallback((account: string) => {
    setTab(null, TABS.PARAMS);
    setTradingAccountId(account);
  }, []);
  const returnToCreateCopytradingAccount = useCallback(
    () => setTab(null, TABS.SELECT_ACCOUNT),
    []
  );
  const submit = useCallback(
    ({
      mode,
      openTolerancePercent,
      percent,
      fixedVolume
    }: FollowParamsFormValues) => {
      const params = {
        ...requestParams,
        tradingAccountId: tradingAccountId!,
        currency,
        mode,
        openTolerancePercent,
        percent,
        fixedVolume
      };
      setRequestParams(params);
      return submitMethod(id, params);
    },
    [id, requestParams, submitMethod, tradingAccountId]
  );
  const adaptStep =
    tab === TABS.SELECT_ACCOUNT
      ? hasAccounts
        ? isExternal
          ? "select-external-account"
          : "select-account"
        : "create-account"
      : "params";

  const followCurrencyWalletId = safeGetElemFromArray(
    wallets,
    wallet => wallet.currency === currency
  ).id;

  const wallet = transformAccountWalletToCommon(
    safeGetElemFromArray(wallets, ({ id }) => id === followCurrencyWalletId)
  );

  return (
    <>
      {/* <FollowTop step={adaptStep} /> */}
      {/* <DialogTop title={t(`follow-program.${step}.title`)} /> -- это из бывшего followtop */}
      {hasAccounts && tab === TABS.SELECT_ACCOUNT && (
        <FollowSelectAccount
          accounts={accounts}
          onSelect={selectCopytradingAccount}
        />
      )}
      {!hasAccounts &&
        tab === TABS.SELECT_ACCOUNT &&
        (isExternal ? (
          <FollowCreateExternalAccount onClick={createdCopytradingAccount} />
        ) : (
            <FollowCreateAccount
              wallet={wallet}
              minDeposit={minDeposit}
              followCurrency={currency!}
              onClick={createdCopytradingAccount}
            />
          ))}
      {tab === TABS.PARAMS && (
        <FollowParams
          errorMessage={errorMessage}
          subscribeFixedCurrencies={subscribeFixedCurrencies}
          rate={rate}
          currency={currency}
          onSubmit={submit}
          onPrevStep={returnToCreateCopytradingAccount}
        />
      )}
    </>
  );
};

const FollowForm = withBlurLoader(React.memo(_FollowForm));
export default FollowForm;
