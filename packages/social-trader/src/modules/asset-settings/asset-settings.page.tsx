import "shared/components/details/details.scss";
import "shared/modules/asset-settings/asset-settings.scss";

import { TUpdateProgramFunc } from "pages/programs/programs-settings/program-settings.page";
import React, { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { connect, ResolveThunks } from "react-redux";
import {
  ActionCreatorsMapObject,
  bindActionCreators,
  compose,
  Dispatch
} from "redux";
import Page from "shared/components/page/page";
import { ASSET } from "shared/constants/constants";

import { AssetDescriptionType, TUpdateAssetFunc } from "./asset-settings.types";
import { editAsset } from "./services/asset-settings.service";

const _AssetsEditPage: React.FC<Props> = ({
  dispatchDescription,
  asset,
  settingsBlocks,
  redirectToAsset,
  service: { editAsset },
  description
}) => {
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
        exitFee: description!.exitFeeCurrent, //exitFee
        entryFee: description!.entryFeeCurrent, //entryFee
        successFee: description!.successFeeCurrent,
        title: description!.title,
        stopOutLevel: description!.stopOutLevelCurrent, // TODO current != selected ? current (selected) : current
        description: description!.description,
        logo: { src: description!.logo }
      };
      editAsset(
        description!.id,
        {
          ...currentValues,
          ...values,
          investmentLimit
        },
        asset
      )
        .then(dispatchDescription)
        .finally(resetForm);
    },
    [asset, description, dispatchDescription, editAsset]
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

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    {
      editAsset
    },
    dispatch
  )
});

interface OwnProps {
  redirectToAsset: (id: string) => void;
  asset: ASSET;
  description?: AssetDescriptionType;
  dispatchDescription: () => void;
  settingsBlocks: (
    editAsset: TUpdateProgramFunc,
    closeAsset: () => void
  ) => JSX.Element;
}

interface ServiceThunks extends ActionCreatorsMapObject {
  editAsset: typeof editAsset;
}
interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}

interface Props extends OwnProps, DispatchProps {}

const AssetSettingsPage = compose<React.ComponentType<OwnProps>>(
  connect(
    null,
    mapDispatchToProps
  ),
  React.memo
)(_AssetsEditPage);
export default AssetSettingsPage;
