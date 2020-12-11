import { BrokerCardType } from "components/assets/broker-select/broker-select.types";
import useCreateAssetSubmit from "components/assets/create-asset/create-asset-submit.hook";
import { TFAConfirmBlock } from "components/assets/tfa-confirm-block";
import { CREATE_ASSET } from "constants/constants";
import useIsOpen from "hooks/is-open.hook";
import CreateProgramSettings from "pages/create-program/components/create-program-settings/create-program-settings";
import * as React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { programsInfoSelector } from "reducers/platform-reducer";

interface Props {
  broker: BrokerCardType;
}

const _CreateProgramSettingsSection: React.FC<Props> = ({ broker }) => {
  const isExchange = !("leverageMin" in broker);

  const programsInfo = useSelector(programsInfoSelector);
  const [programId, setProgramId] = useState<string | undefined>(undefined);
  const [twoFactorRequired, setTwoFactorRequired] = useIsOpen();

  const { handleCreate, errorMessage } = useCreateAssetSubmit({
    condition: ({ twoFactorRequired, id }) => {
      if (twoFactorRequired) {
        setProgramId(id);
        setTwoFactorRequired();
        return false;
      }
      return true;
    },
    asset: isExchange ? CREATE_ASSET.EXCHANGE_PROGRAM : CREATE_ASSET.PROGRAM
  });

  return (
    <>
      <CreateProgramSettings
        programsInfo={programsInfo}
        errorMessage={errorMessage}
        onSubmit={handleCreate}
        broker={broker}
      />
      {twoFactorRequired && <TFAConfirmBlock id={programId!} />}
    </>
  );
};

const CreateProgramSettingsSection = React.memo(_CreateProgramSettingsSection);
export default CreateProgramSettingsSection;
