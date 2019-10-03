import useCreateAssetSubmit from "components/create-asset/create-asset-submit.hook";
import { Broker } from "gv-api-web";
import * as React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { ASSET } from "shared/constants/constants";
import useIsOpen from "shared/hooks/is-open.hook";
import { nameSelector } from "shared/reducers/header-reducer";
import { programsInfoSelector } from "shared/reducers/platform-reducer";

import { TFAConfirmBlock } from "../tfa-confirm-block";
import CreateProgramSettings from "./create-program-settings";

const _CreateProgramSettingsSection: React.FC<OwnProps> = ({ broker }) => {
  const [programId, setProgramId] = useState<string | undefined>(undefined);
  const [twoFactorRequired, setTwoFactorRequired] = useIsOpen();

  const author = useSelector(nameSelector);
  const programsInfo = useSelector(programsInfoSelector);

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
        onSubmit={handleCreate}
        minimumDepositsAmount={broker.accountTypes[0].minimumDepositsAmount}
        broker={broker}
        author={author}
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
