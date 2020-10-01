import SettingsBlock from "components/settings-block/settings-block";
import Crashable from "decorators/crashable";
import withLoader from "decorators/with-loader";
import { FundAssetInfo, PlatformAsset } from "gv-api-web";
import useApiRequest from "hooks/api-request.hook";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { postponeCallback } from "utils/hook-form.helpers";

import ReallocateForm, { IReallocateFormValues } from "./components/reallocate-form";
import { updateAssets } from "./services/reallocate.services";

interface Props {
  isPublic?: boolean;
  availableReallocationPercents: number;
  id: string;
  platformAssets: PlatformAsset[];
  fundAssets: FundAssetInfo[];
  onApply: () => void;
}

const _Reallocation: React.FC<Props> = ({
  isPublic,
  availableReallocationPercents,
  onApply,
  platformAssets,
  fundAssets,
  id
}) => {
  const [t] = useTranslation();
  const { errorMessage, sendRequest } = useApiRequest({
    successMessage: "asset-settings:reallocate.success-alert-message",
    middleware: [postponeCallback(onApply)],
    request: args => updateAssets(args)
  });
  const handleApply = useCallback(
    ({ assets }: IReallocateFormValues) => {
      return sendRequest({ id, assets });
    },
    [id]
  );
  return (
    <SettingsBlock label={t("fund-settings:reallocation.title")}>
      <ReallocateForm
        isPublic={isPublic}
        condition={!!fundAssets.length}
        availableReallocationPercents={availableReallocationPercents}
        fundAssets={fundAssets}
        platformAssets={platformAssets}
        onSubmit={handleApply}
        errorMessage={errorMessage}
      />
    </SettingsBlock>
  );
};

const Reallocation = withLoader(React.memo(Crashable(_Reallocation)));
export default Reallocation;
