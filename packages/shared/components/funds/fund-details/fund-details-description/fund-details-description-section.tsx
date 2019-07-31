import "shared/components/details/details-description-section/details-description/details-description.scss";

import { FundDetailsFull } from "gv-api-web";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { connect, ResolveThunks } from "react-redux";
import {
  ActionCreatorsMapObject,
  bindActionCreators,
  compose,
  Dispatch
} from "redux";
import AssetAvatar from "shared/components/avatar/asset-avatar/asset-avatar";
import DetailsInvestment from "shared/components/details/details-description-section/details-investment/details-investment";
import { InvestmentDetails } from "shared/components/details/details-description-section/details-investment/details-investment.helpers";
import { FUND_ASSET_TYPE } from "shared/components/fund-asset/fund-asset";
import FundAssetContainer from "shared/components/fund-asset/fund-asset-container";
import FundDetailsDescription from "shared/components/funds/fund-details/fund-details-description/fund-details-description";
import { dispatchFundDescription } from "shared/components/funds/fund-details/services/fund-details.service";
import { TooltipLabel } from "shared/components/tooltip-label/tooltip-label";
import { FUND, STATUS } from "shared/constants/constants";

import {
  IFundControlsProps,
  IFundWithdrawalContainerProps
} from "../fund-details.types";

const _FundFundDetailsDescription: React.FC<Props> = ({
  service: { dispatchFundDescription },
  t,
  accountCurrency,
  isAuthenticated,
  redirectToLogin,
  fundDescription,
  FundControls,
  FundWithdrawContainer
}) => (
  <div className="asset-details-description">
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
    {fundDescription.personalFundDetails &&
      fundDescription.personalFundDetails.status !== STATUS.ENDED && (
        <div className="asset-details-description__additionally">
          <DetailsInvestment
            updateDescription={dispatchFundDescription}
            asset={FUND}
            id={fundDescription.id}
            assetCurrency={"GVT"}
            accountCurrency={accountCurrency}
            personalDetails={
              fundDescription.personalFundDetails as InvestmentDetails
            }
            WithdrawContainer={FundWithdrawContainer}
          />
        </div>
      )}
  </div>
);

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    {
      dispatchFundDescription
    },
    dispatch
  )
});

interface ServiceThunks extends ActionCreatorsMapObject {
  dispatchFundDescription: typeof dispatchFundDescription;
}
interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}

interface OwnProps {
  fundDescription: FundDetailsFull;
  isAuthenticated: boolean;
  redirectToLogin(): void;
  FundControls: React.ComponentType<IFundControlsProps>;
  FundWithdrawContainer: React.ComponentType<IFundWithdrawalContainerProps>;
  accountCurrency: string;
}

interface Props extends WithTranslation, OwnProps, DispatchProps {}

const FundFundDetailsDescription = compose<React.ComponentType<OwnProps>>(
  connect(
    null,
    mapDispatchToProps
  ),
  translate(),
  React.memo
)(_FundFundDetailsDescription);
export default FundFundDetailsDescription;
