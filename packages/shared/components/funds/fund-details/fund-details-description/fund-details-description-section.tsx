import "shared/components/details/details-description-section/details-description/details-description.scss";

import { FundDetailsFull } from "gv-api-web";
import * as React from "react";
import { useTranslation } from "react-i18next";
import AssetAvatar from "shared/components/avatar/asset-avatar/asset-avatar";
import { FUND_ASSET_TYPE } from "shared/components/fund-asset/fund-asset";
import FundAssetContainer from "shared/components/fund-asset/fund-asset-container";
import FundDetailsDescription from "shared/components/funds/fund-details/fund-details-description/fund-details-description";
import { TooltipLabel } from "shared/components/tooltip-label/tooltip-label";

import { IFundControlsProps } from "../fund-details.types";

const _FundFundDetailsDescription: React.FC<Props> = ({
  isAuthenticated,
  fundDescription,
  FundControls
}) => {
  const [t] = useTranslation();
  return (
    <div className="details__section program-details-description">
      <FundDetailsDescription
        description={fundDescription}
        AssetDetailsAvatar={() => (
          <div className="details-description__avatar">
            <AssetAvatar
              url={fundDescription.logo}
              alt={fundDescription.title}
              size="big"
              color={fundDescription.color}
            />
          </div>
        )}
        AssetDetailsExtraBlock={() => (
          <div className="details-description__info-block">
            <h4 className="details-description__subheading tooltip__label">
              <TooltipLabel
                tooltipContent={t("fund-details-page.tooltip.assets")}
                labelText={t("fund-details-page.description.assets")}
              />
            </h4>
            <div>
              <FundAssetContainer
                type={FUND_ASSET_TYPE.LARGE}
                assets={fundDescription.currentAssets}
                size={7}
              />
            </div>
          </div>
        )}
      />
      <FundControls
        fundDescription={fundDescription}
        isAuthenticated={isAuthenticated}
      />
    </div>
  );
};

interface Props {
  fundDescription: FundDetailsFull;
  isAuthenticated: boolean;
  FundControls: React.ComponentType<IFundControlsProps>;
}

const FundFundDetailsDescription = React.memo(_FundFundDetailsDescription);
export default FundFundDetailsDescription;
