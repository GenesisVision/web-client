import { FundDetailsFull, PlatformAsset } from "gv-api-web";
import AssetEdit from "modules/asset-settings/asset-edit";
import PeriodAndClosing from "modules/asset-settings/period-and-closing";
import React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import { ASSET } from "shared/constants/constants";
import withLoader, { WithLoaderProps } from "shared/decorators/with-loader";

import { TUpdateProgramFunc } from "./fund-settings.page";
import Reallocation from "./reallocation/reallocation";

const _FundSettings: React.FC<Props> = ({
  reallocate,
  platformAssets,
  t,
  details,
  closeAsset,
  editAsset
}) => {
  return (
    <>
      <Reallocation
        condition={details.personalFundDetails.canReallocate}
        availableReallocationPercents={
          details.personalFundDetails.availableReallocationPercents
        }
        onApply={reallocate}
        id={details.id}
        fundAssets={details.currentAssets}
        platformAssets={platformAssets}
      />
      <AssetEdit
        title={details.title}
        logo={{ src: details.logo }}
        description={details.description}
        onSubmit={editAsset}
      />
      <PeriodAndClosing
        label={t("manager.fund-settings.close-fund.title")}
        asset={ASSET.FUND}
        canCloseAsset={details.personalFundDetails.canCloseProgram}
        id={details.id}
        closeAsset={closeAsset}
      />
    </>
  );
};

interface Props extends OwnProps, WithTranslation {}

interface OwnProps {
  reallocate: () => void;
  platformAssets: PlatformAsset[];
  details: FundDetailsFull;
  closeAsset: () => void;
  editAsset: TUpdateProgramFunc;
}

const FundSettings = compose<React.ComponentType<OwnProps & WithLoaderProps>>(
  withLoader,
  translate(),
  React.memo
)(_FundSettings);
export default FundSettings;
