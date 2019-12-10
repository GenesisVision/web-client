import "components/details/details.scss";
import "./asset-settings.scss";

import Page from "components/page/page";
import useApiRequest from "hooks/api-request.hook";
import { TUpdateProgramFunc } from "pages/programs/programs-settings/program-settings.page";
import React, { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ASSET } from "shared/constants/constants";

import { AssetDescriptionType, TUpdateAssetFunc } from "./asset-settings.types";
import { editAsset } from "./services/asset-settings.service";

const _AssetsEditPage: React.FC<Props> = ({
  dispatchDescription,
  asset,
  settingsBlocks,
  redirectToAsset,
  description
}) => {
  const successMessage =
    (asset === ASSET.PROGRAM && "edit-program.notifications.edit-success") ||
    (asset === ASSET.FUND && "edit-fund.notifications.edit-success") ||
    "";
  const { sendRequest: editRequest } = useApiRequest({
    middleware: [dispatchDescription],
    request: editAsset,
    successMessage
  });
  const [t] = useTranslation();
  useEffect(() => {
    dispatchDescription();
  }, []);
  const editAssetCallback: TUpdateAssetFunc = useCallback(
    (values, setSubmitting, resetForm) => {
      const investmentLimit =
        "hasInvestmentLimit" in values
          ? values.hasInvestmentLimit
            ? values.investmentLimit || null
            : null
          : description!.availableInvestmentLimit;
      const currentValues = {
        tradesDelay: description!.tradesDelay,
        exitFee: description!.exitFeeSelected, //exitFee
        entryFee: description!.entryFeeSelected, //entryFee
        successFee: description!.successFeeSelected,
        title: description!.title,
        stopOutLevel: description!.stopOutLevelSelected, // TODO current != selected ? current (selected) : current
        description: description!.description,
        logo: { src: description!.logo }
      };
      editRequest({
        id: description!.id,
        editAssetData: {
          ...currentValues,
          ...values,
          investmentLimit
        },
        asset
      }).finally(resetForm);
    },
    [asset, description, editAsset]
  );
  const applyCloseAsset = useCallback(() => redirectToAsset(description!.id), [
    description,
    redirectToAsset
  ]);
  const title = t("asset-settings.title", {
    asset: String(asset).toLowerCase()
  });
  return (
    <Page title={title}>
      <div className="asset-settings">
        <h1 className="asset-settings__title">{title}</h1>
        {settingsBlocks(editAssetCallback, applyCloseAsset)}
      </div>
    </Page>
  );
};

interface Props {
  redirectToAsset: (id: string) => void;
  asset: ASSET;
  description?: AssetDescriptionType;
  dispatchDescription: () => void;
  settingsBlocks: (
    editAsset: TUpdateProgramFunc,
    closeAsset: () => void
  ) => JSX.Element;
}

const AssetSettingsPage = React.memo(_AssetsEditPage);
export default AssetSettingsPage;
