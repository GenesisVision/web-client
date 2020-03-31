import Page from "components/page/page";
import Crashable from "decorators/crashable";
import useApiRequest from "hooks/api-request.hook";
import { CLOSEABLE_ASSET } from "modules/asset-settings/close-asset/close-asset";
import { TUpdateProgramFunc } from "pages/invest/programs/programs-settings/program-settings.page";
import React, { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";

import "./asset-settings.scss";
import { AssetDescriptionType, TUpdateAssetFunc } from "./asset-settings.types";
import { editAsset } from "./services/asset-settings.service";

const _AssetsEditPage: React.FC<Props> = ({
  dispatchDescription,
  asset,
  settingsBlocks,
  redirectToAsset,
  description
}) => {
  const successMessage = `edit-asset.notifications.edit-success.${asset.toLowerCase()}`;
  const { sendRequest: editRequest, errorMessage } = useApiRequest({
    middleware: [dispatchDescription],
    request: editAsset,
    successMessage
  });
  const [t] = useTranslation();
  useEffect(() => {
    dispatchDescription();
  }, []);
  const editAssetCallback: TUpdateAssetFunc = useCallback(
    (values, resetForm) => {
      const investmentLimit =
        values.investmentLimit !== undefined ? values.investmentLimit : null;
      const currentValues = {
        tradesDelay: description.tradesDelay,
        exitFee: description.exitFeeSelected, //exitFee
        entryFee: description.entryFeeSelected, //entryFee
        successFee: description.successFeeSelected,
        title: description.publicInfo.title,
        stopOutLevel: description.stopOutLevelSelected, // TODO current != selected ? current (selected) : current
        description: description.publicInfo.description,
        logo: { src: description.publicInfo.logoUrl }
      };
      return editRequest({
        id: description.id,
        editAssetData: {
          ...currentValues,
          ...values,
          investmentLimit
        }
      }).finally(resetForm);
    },
    [description, editAsset]
  );
  const applyCloseAsset = useCallback(() => redirectToAsset(description.id), [
    description,
    redirectToAsset
  ]);
  const title = t("asset-settings.title");
  return (
    <Page showTitle title={title}>
      <div className="asset-settings">
        {settingsBlocks(editAssetCallback, applyCloseAsset, errorMessage)}
      </div>
    </Page>
  );
};

interface Props {
  redirectToAsset: (id: string) => void;
  asset: CLOSEABLE_ASSET;
  description: AssetDescriptionType;
  dispatchDescription: () => void;
  settingsBlocks: (
    editAsset: TUpdateProgramFunc,
    closeAsset: () => void,
    errorMessage?: string
  ) => JSX.Element;
}

const AssetSettingsPage = React.memo(Crashable(_AssetsEditPage));
export default AssetSettingsPage;
