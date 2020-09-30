import SettingsBlock from "components/settings-block/settings-block";
import { ASSET } from "constants/constants";
import withLoader from "decorators/with-loader";
import {
  FundCreateAssetPlatformInfo,
  FundDetailsFull,
  PlatformAsset
} from "gv-api-web";
import AssetEdit from "modules/asset-settings/asset-edit";
import { CLOSEABLE_ASSET } from "modules/asset-settings/close-asset/close-asset";
import CloseAssetBlock from "modules/asset-settings/close-asset/close-asset-block";
import InvestmentFees from "modules/asset-settings/investment-fees";
import { MakePublicFundButton } from "modules/fund-public-popup/make-public-fund.button";
import React from "react";
import { useTranslation } from "react-i18next";

import { TUpdateFundFunc } from "./fund-settings.page";
import Reallocation from "./reallocation/reallocation";

interface Props {
  updateDescription: VoidFunction;
  createFundInfo: FundCreateAssetPlatformInfo;
  reallocate: VoidFunction;
  platformAssets: PlatformAsset[];
  details: FundDetailsFull;
  closeAsset: VoidFunction;
  editAsset: TUpdateFundFunc;
}

const _FundSettings: React.FC<Props> = ({
  updateDescription,
  createFundInfo: { maxExitFee, maxEntryFee },
  reallocate,
  platformAssets,
  details,
  closeAsset,
  editAsset
}) => {
  const [t] = useTranslation();
  const isPublic = details.publicInfo.typeExt === "Fund";
  return (
    <>
      <Reallocation
        isPublic={isPublic}
        condition={details.personalDetails.ownerActions.canReallocate}
        availableReallocationPercents={
          details.personalDetails.availableReallocationPercents
        }
        onApply={reallocate}
        id={details.id}
        fundAssets={details.assetsStructure}
        platformAssets={platformAssets}
      />
      {isPublic && (
        <InvestmentFees
          asset={ASSET.FUND}
          maxExitFee={maxExitFee}
          maxEntryFee={maxEntryFee}
          entryFee={details.entryFeeCurrent}
          exitFee={details.exitFeeCurrent}
          onSubmit={editAsset}
        />
      )}
      <AssetEdit
        key={details.id + isPublic}
        showDescription={isPublic}
        title={details.publicInfo.title}
        logo={{ src: details.publicInfo.logoUrl }}
        description={details.publicInfo.description}
        onSubmit={editAsset}
      />
      {!isPublic && (
        <SettingsBlock>
          <MakePublicFundButton
            id={details.id}
            onApply={updateDescription}
            title={details.publicInfo.title}
          />
        </SettingsBlock>
      )}
      <CloseAssetBlock
        label={t("asset-settings:close-fund.title")}
        asset={CLOSEABLE_ASSET.FUND}
        canCloseAsset={details.personalDetails.ownerActions.canClose}
        id={details.id}
        closeAsset={closeAsset}
      />
    </>
  );
};

const FundSettings = withLoader(React.memo(_FundSettings));
export default FundSettings;
