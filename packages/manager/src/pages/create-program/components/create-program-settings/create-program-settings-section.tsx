import useCreateAssetSection from "components/create-asset/create-asset-section.hook";
import {
  Broker,
  BrokerAccountType,
  ManagerProgramCreateResult,
  ProgramsInfo
} from "gv-api-web";
import * as React from "react";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchWallets } from "shared/components/wallet/services/wallet.services";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import { fetchRate } from "shared/services/rate-service";
import {
  CurrencyEnum,
  ResponseError,
  SetSubmittingType
} from "shared/utils/types";

import { createProgram } from "../../services/create-program.service";
import CreateProgramSettings, {
  ICreateProgramSettingsFormValues
} from "./create-program-settings";

const getCurrency = (accountType: BrokerAccountType): CurrencyEnum =>
  accountType.currencies[0] as CurrencyEnum; // TODO say to backend change type to CurrencyEnum[]

const getLeverage = (accountType: BrokerAccountType): number =>
  accountType.leverages[0];

const _CreateProgramSettingsSection: React.FC<OwnProps> = ({
  currency,
  broker,
  programsInfo,
  onSubmit,
  minimumDepositsAmount,
  navigateBack,
  author
}) => {
  const brokerAccountType = broker.accountTypes[0];
  const [programCurrency, setProgramCurrency] = useState<CurrencyEnum>(
    getCurrency(brokerAccountType)
  );
  const { rate, handleWalletChange, wallet, wallets } = useCreateAssetSection({
    assetCurrency: programCurrency
  });

  const dispatch = useDispatch();
  const [accountType, setAccountType] = useState<BrokerAccountType>(
    brokerAccountType
  );
  const [leverage, setLeverage] = useState<number>(
    getLeverage(brokerAccountType)
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
      condition={!!wallet}
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

export const CreateProgramSettingsSection = React.memo(
  _CreateProgramSettingsSection
);

interface OwnProps {
  currency: CurrencyEnum;
  broker: Broker;
  programsInfo: ProgramsInfo;
  onSubmit: (data: ManagerProgramCreateResult) => void;
  minimumDepositsAmount: { [key: string]: number };
  navigateBack: () => void;
  author: string;
}
