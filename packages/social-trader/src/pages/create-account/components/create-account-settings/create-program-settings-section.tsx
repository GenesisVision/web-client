import useCreateAssetSubmit from "components/create-asset/create-asset-submit.hook";
import { Broker } from "gv-api-web";
import CreateAccountSettings from "pages/create-account/components/create-account-settings/create-account-settings";
import * as React from "react";
import { ASSET } from "shared/constants/constants";

const _CreateAccountSettingsSection: React.FC<Props> = ({ broker }) => {
  const handleCreate = useCreateAssetSubmit({
    asset: ASSET.ACCOUNT
  });

  return (
    <CreateAccountSettings
      onSubmit={handleCreate}
      minimumDepositsAmount={broker.accountTypes[0].minimumDepositsAmount}
      broker={broker}
    />
  );
};

export const CreateAccountSettingsSection = React.memo(
  _CreateAccountSettingsSection
);

interface Props {
  broker: Broker;
}
