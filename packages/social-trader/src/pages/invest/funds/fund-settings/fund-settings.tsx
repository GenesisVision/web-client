import { ASSET } from "constants/constants";
import withLoader, { WithLoaderProps } from "decorators/with-loader";
import {
  FundCreateAssetPlatformInfo,
  FundDetailsFull,
  PlatformAsset
} from "gv-api-web";
import AssetEdit from "modules/asset-settings/asset-edit";
import { CLOSEABLE_ASSET } from "modules/asset-settings/close-asset/close-asset";
import CloseAssetBlock from "modules/asset-settings/close-asset/close-asset-block";
import InvestmentFees from "modules/asset-settings/investment-fees";
import React from "react";
import { useTranslation } from "react-i18next";
import { compose } from "redux";

import { TUpdateFundFunc } from "./fund-settings.page";
import Reallocation from "./reallocation/reallocation";

const _FundSettings: React.FC<Props> = ({
  createFundInfo: { maxExitFee, maxEntryFee },
  reallocate,
  platformAssets,
  details,
  closeAsset,
  editAsset
}) => {
  const [t] = useTranslation();
  return (
    <>
      <Reallocation
        condition={details.personalDetails.ownerActions.canReallocate}
        availableReallocationPercents={
          details.personalDetails.availableReallocationPercents
        }
        onApply={reallocate}
        id={details.id}
        fundAssets={details.assetsStructure}
        platformAssets={platformAssets}
      />
      <InvestmentFees
        asset={ASSET.FUND}
        maxExitFee={maxExitFee}
        maxEntryFee={maxEntryFee}
        entryFee={details.entryFeeCurrent}
        exitFee={details.exitFeeCurrent}
        onSubmit={editAsset}
      />
      <AssetEdit
        title={details.publicInfo.title}
        logo={{ src: details.publicInfo.logo }}
        description={details.publicInfo.description}
        onSubmit={editAsset}
      />
      <CloseAssetBlock
        label={t("asset-settings.close-fund.title")}
        asset={CLOSEABLE_ASSET.FUND}
        canCloseAsset={details.personalDetails.ownerActions.canClose}
        id={details.id}
        closeAsset={closeAsset}
      />
    </>
  );
};

interface Props extends OwnProps {}

interface OwnProps {
  createFundInfo: FundCreateAssetPlatformInfo;
  reallocate: () => void;
  platformAssets: PlatformAsset[];
  details: FundDetailsFull;
  closeAsset: () => void;
  editAsset: TUpdateFundFunc;
}

const FundSettings = compose<React.ComponentType<OwnProps & WithLoaderProps>>(
  withLoader,
  React.memo
)(_FundSettings);
export default FundSettings;
