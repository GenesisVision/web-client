import "shared/components/details/details-description-section/details-description/details-description.scss";

import { FundDetailsFull } from "gv-api-web";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import AssetAvatar from "shared/components/avatar/asset-avatar/asset-avatar";
import { FUND_ASSET_TYPE } from "shared/components/fund-asset/fund-asset";
import FundAssetContainer from "shared/components/fund-asset/fund-asset-container";
import FundDetailsDescription from "shared/components/funds/fund-details/fund-details-description/fund-details-description";
import { TooltipLabel } from "shared/components/tooltip-label/tooltip-label";
import { CurrencyEnum } from "shared/utils/types";

import { IFundControlsProps } from "../fund-details.types";

const _FundFundDetailsDescription: React.FC<Props> = ({
  t,
  isAuthenticated,
  redirectToLogin,
  fundDescription,
  FundControls
}) => (
  <div className="program-details-description">
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
      redirectToLogin={redirectToLogin}
    />
  </div>
);

interface OwnProps {
  fundDescription: FundDetailsFull;
  isAuthenticated: boolean;
  redirectToLogin(): void;
  FundControls: React.ComponentType<IFundControlsProps>;
}

interface Props extends WithTranslation, OwnProps {}

const FundFundDetailsDescription = compose<React.ComponentType<OwnProps>>(
  translate(),
  React.memo
)(_FundFundDetailsDescription);
export default FundFundDetailsDescription;
