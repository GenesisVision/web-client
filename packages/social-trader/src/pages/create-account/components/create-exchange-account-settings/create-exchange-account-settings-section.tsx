import useCreateAssetSubmit from "components/assets/create-asset/create-asset-submit.hook";
import { CREATE_ASSET } from "constants/constants";
import { ExchangeInfo } from "gv-api-web";
import * as React from "react";

import CreateExchangeAccountSettings from "./create-exchange-account-settings";

const _CreateExchangeAccountSettingsSection: React.FC<Props> = ({
  exchange
}) => {
  const { handleCreate, errorMessage } = useCreateAssetSubmit({
    asset: CREATE_ASSET.EXCHANGE_ACCOUNT
  });

  return (
    <CreateExchangeAccountSettings
      errorMessage={errorMessage}
      onSubmit={handleCreate}
      exchange={exchange}
    />
  );
};

interface Props {
  exchange: ExchangeInfo;
}

const CreateExchangeAccountSettingsSection = React.memo(
  _CreateExchangeAccountSettingsSection
);
export default CreateExchangeAccountSettingsSection;
