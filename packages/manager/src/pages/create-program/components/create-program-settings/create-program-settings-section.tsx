import { Broker, BrokerAccountType, ManagerProgramCreateResult, ProgramsInfo, WalletData } from "gv-api-web";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import { rateApi } from "shared/services/api-client/rate-api";
import { CurrencyEnum, ResponseError, SetSubmittingType } from "shared/utils/types";

import { createProgram } from "../../services/create-program.service";
import CreateProgramSettings, { ICreateProgramSettingsFormValues } from "./create-program-settings";

const getCurrency = (accountType: BrokerAccountType): CurrencyEnum =>
  accountType.currencies[0] as CurrencyEnum; // TODO say to backend change type to CurrencyEnum[]

const getLeverage = (accountType: BrokerAccountType): number =>
  accountType.leverages[0];

const CreateProgramSettingsSection: React.FC<OwnProps> = ({
  currency,
  broker,
  wallets,
  programsInfo,
  fetchWallets,
  onSubmit,
  minimumDepositsAmount,
  navigateBack,
  author,
  notifyError
}) => {
  const dispatch = useDispatch();
  const brokerAccountType = broker.accountTypes[0];
  const [accountType, setAccountType] = useState<BrokerAccountType>(
    brokerAccountType
  );
  const [programCurrency, setProgramCurrency] = useState<CurrencyEnum>(
    getCurrency(brokerAccountType)
  );
  const [leverage, setLeverage] = useState<number>(
    getLeverage(brokerAccountType)
  );
  const [wallet, setWallet] = useState<WalletData>(
    wallets.find(({ currency }) => currency === "GVT")!
  );
  const [rate, setRate] = useState<number>(1);

  useEffect(
    () => {
      rateApi
        .v10RateByFromByToGet(wallet.currency, programCurrency)
        .then(setRate);
    },
    [programCurrency, wallet]
  );

  const handleAccountTypeChange = useCallback(
    (brokerAccountTypeId: string) => {
      const accountType = broker.accountTypes.find(
        ({ id }) => id === brokerAccountTypeId
      )!;
      setAccountType(accountType);
      setProgramCurrency(getCurrency(accountType));
      setLeverage(getLeverage(accountType));
    },
    [broker]
  );

  const handleWalletChange = useCallback(
    (walletId: string) => setWallet(wallets.find(({ id }) => id === walletId)!),
    [wallets]
  );

  const handleCreateProgram = useCallback(
    (
      data: ICreateProgramSettingsFormValues,
      setSubmitting: SetSubmittingType
    ) => {
      createProgram(data)
        .then(data => {
          onSubmit(data);
        })
        .catch((error: ResponseError) => {
          dispatch(alertMessageActions.error(error.errorMessage));
        })
        .finally(() => {
          dispatch(fetchWallets(currency));
          setSubmitting(false);
        });
    },
    []
  );

  return (
    <CreateProgramSettings
      notifyError={notifyError}
      navigateBack={navigateBack}
      onSubmit={handleCreateProgram}
      minimumDepositsAmount={minimumDepositsAmount}
      broker={broker}
      author={author}
      programsInfo={programsInfo}
      wallets={wallets}
      wallet={wallet}
      leverage={leverage}
      programCurrency={programCurrency}
      rate={rate}
      accountType={accountType}
      changeLeverage={setLeverage}
      changeWallet={handleWalletChange}
      changeCurrency={setProgramCurrency}
      changeAccountType={handleAccountTypeChange}
    />
  );
};

export default CreateProgramSettingsSection;

interface OwnProps {
  currency: CurrencyEnum;
  broker: Broker;
  wallets: WalletData[];
  programsInfo: ProgramsInfo;
  fetchWallets: (currency: CurrencyEnum) => void;
  onSubmit: (data: ManagerProgramCreateResult) => void;
  minimumDepositsAmount: { [key: string]: number };
  navigateBack: () => void;
  author: string;
  notifyError: (message: string) => void;
}
