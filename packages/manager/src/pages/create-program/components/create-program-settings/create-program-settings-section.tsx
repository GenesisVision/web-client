import useCreateAssetSection from "components/create-asset/create-asset-section.hook";
import useCreateAssetSubmit from "components/create-asset/create-asset-submit.hook";
import { Broker, BrokerAccountType } from "gv-api-web";
import * as React from "react";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { ASSET } from "shared/constants/constants";
import useIsOpen from "shared/hooks/is-open.hook";
import { nameSelector } from "shared/reducers/header-reducer";
import { programsInfoSelector } from "shared/reducers/platform-reducer";
import { CurrencyEnum } from "shared/utils/types";

import { TFAConfirmBlock } from "../tfa-confirm-block";
import CreateProgramSettings from "./create-program-settings";

const getCurrency = (accountType: BrokerAccountType): CurrencyEnum =>
  accountType.currencies[0] as CurrencyEnum; // TODO say to backend change type to CurrencyEnum[]

const getLeverage = (accountType: BrokerAccountType): number =>
  accountType.leverages[0];

const _CreateProgramSettingsSection: React.FC<OwnProps> = ({ broker }) => {
  const [programId, setProgramId] = useState<string | undefined>(undefined);
  const [twoFactorRequired, setTwoFactorRequired] = useIsOpen();

  const author = useSelector(nameSelector);
  const programsInfo = useSelector(programsInfoSelector);
  const brokerAccountType = broker.accountTypes[0];
  const [programCurrency, setProgramCurrency] = useState<CurrencyEnum>(
    getCurrency(brokerAccountType)
  );
  const { rate, handleWalletChange, wallet, wallets } = useCreateAssetSection({
    assetCurrency: programCurrency
  });

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

  const handleCreate = useCreateAssetSubmit({
    asset: ASSET.PROGRAM,
    condition: ({ twoFactorRequired, programId }) => {
      if (twoFactorRequired) {
        setProgramId(programId);
        setTwoFactorRequired();
        return false;
      }
      return true;
    }
  });

  return (
    <>
      <CreateProgramSettings
        programsInfo={programsInfo}
        condition={!!wallet}
        onSubmit={handleCreate}
        minimumDepositsAmount={broker.accountTypes[0].minimumDepositsAmount}
        broker={broker}
        author={author}
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
      {twoFactorRequired && <TFAConfirmBlock id={programId!} />}
    </>
  );
};

export const CreateProgramSettingsSection = React.memo(
  _CreateProgramSettingsSection
);

interface OwnProps {
  broker: Broker;
}
