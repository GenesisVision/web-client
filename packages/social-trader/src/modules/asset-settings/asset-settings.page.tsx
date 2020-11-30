import Page from "components/page/page";
import Crashable from "decorators/crashable";
import useApiRequest from "hooks/api-request.hook";
import { CLOSEABLE_ASSET } from "modules/asset-settings/close-asset/close-asset";
import { TUpdateProgramFunc } from "pages/invest/programs/programs-settings/program-settings.page";
import React, { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { AssetDescriptionType, TUpdateAssetFunc } from "./asset-settings.types";
import { editAsset } from "./services/asset-settings.service";

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

const _AssetsEditPage: React.FC<Props> = ({
  dispatchDescription,
  asset,
  settingsBlocks,
  redirectToAsset,
  description
}) => {
  const successMessage = `asset-settings:notifications.edit-success.${asset.toLowerCase()}`;
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
        values.investmentLimit !== undefined
          ? values.investmentLimit
          : description.programDetails?.availableInvestmentLimit;
      const logo =
        values.logo?.image?.cropped !== undefined
          ? values.logo
          : values.logo?.src
          ? { src: description.publicInfo.logo }
          : {};
      const currentValues = {
        hourProcessing:
          description?.programDetails?.dailyPeriodDetails?.hourProcessing,
        isProcessingRealTime:
          description?.programDetails?.dailyPeriodDetails?.isProcessingRealTime,
        logo: { src: description.publicInfo.logo },
        tradesDelay: description.tradesDelay,
        exitFee: description.exitFeeSelected, //exitFee
        entryFee: description.entryFeeSelected, //entryFee
        successFee: description.successFeeSelected,
        title: description.publicInfo.title,
        stopOutLevel: description.stopOutLevelSelected, // TODO current != selected ? current (selected) : current
        description: description.publicInfo.description
      };
      return editRequest({
        id: description.id,
        editAssetData: {
          ...currentValues,
          ...values,
          logo,
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
  const title = t("asset-settings:title");
  return (
    <Page showTitle title={title}>
      {settingsBlocks(editAssetCallback, applyCloseAsset, errorMessage)}
    </Page>
  );
};

const AssetSettingsPage = React.memo(Crashable(_AssetsEditPage));
export default AssetSettingsPage;
