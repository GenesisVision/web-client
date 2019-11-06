import useCreateAssetSubmit from "components/create-asset/create-asset-submit.hook";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { programDescriptionSelector } from "shared/components/programs/program-details/reducers/description.reducer";
import { ASSET } from "shared/constants/constants";
import useIsOpen from "shared/hooks/is-open.hook";
import { programsInfoSelector } from "shared/reducers/platform-reducer";

import { TFAConfirmBlock } from "../tfa-confirm-block";
import CreateProgramSettings from "./create-program-settings";

const _CreateProgramSettingsSection: React.FC<Props> = () => {
  const [programId, setProgramId] = useState<string | undefined>(undefined);
  const [twoFactorRequired, setTwoFactorRequired] = useIsOpen();

  const programsInfo = useSelector(programsInfoSelector);
  const programDescription = useSelector(programDescriptionSelector);

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

  if (!programDescription) return null;
  const { currency } = programDescription;

  return (
    <>
      <CreateProgramSettings
        currency={currency}
        programsInfo={programsInfo}
        onSubmit={handleCreate}
        minimumDepositsAmount={{ GVT: 100 }}
      />
      {twoFactorRequired && <TFAConfirmBlock id={programId!} />}
    </>
  );
};

export const CreateProgramSettingsSection = React.memo(
  _CreateProgramSettingsSection
);

interface Props {}
