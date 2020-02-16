import useCreateAssetSubmit from "components/assets/create-asset/create-asset-submit.hook";
import { TFAConfirmBlock } from "components/assets/tfa-confirm-block";
import { CREATE_ASSET } from "constants/constants";
import { Broker } from "gv-api-web";
import useIsOpen from "hooks/is-open.hook";
import CreateAccountSettings from "pages/create-account/components/create-account-settings/create-account-settings";
import * as React from "react";
import { useState } from "react";

const _CreateAccountSettingsSection: React.FC<Props> = ({ broker }) => {
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
    asset: CREATE_ASSET.ACCOUNT
  });

  return (
    <>
      <CreateAccountSettings
        errorMessage={errorMessage}
        onSubmit={handleCreate}
        broker={broker}
      />
      {twoFactorRequired && <TFAConfirmBlock id={programId!} />}
    </>
  );
};

interface Props {
  broker: Broker;
}

const CreateAccountSettingsSection = React.memo(_CreateAccountSettingsSection);
export default CreateAccountSettingsSection;
