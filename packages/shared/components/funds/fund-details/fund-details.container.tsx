import "shared/components/details/details.scss";

import { FundDetailsFull } from "gv-api-web";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { compose } from "redux";
import AssetAvatar from "shared/components/avatar/asset-avatar/asset-avatar";
import DetailsDescriptionSection from "shared/components/details/details-description-section/details-description/details-description-section";
import DetailsInvestment from "shared/components/details/details-description-section/details-investment/details-investment";
import { InvestmentDetails } from "shared/components/details/details-description-section/details-investment/details-investment.helpers";
import { FUND_ASSET_TYPE } from "shared/components/fund-asset/fund-asset";
import FundAssetContainer from "shared/components/fund-asset/fund-asset-container";
import Page from "shared/components/page/page";
import { TooltipLabel } from "shared/components/tooltip-label/tooltip-label";
import { ASSET } from "shared/constants/constants";
import {
  withBlurLoader,
  WithBlurLoaderProps
} from "shared/decorators/with-blur-loader";
import { isAuthenticatedSelector } from "shared/reducers/auth-reducer";
import { fundEventsSelector } from "shared/reducers/platform-reducer";
import {
  composeFundNotificationsUrl,
  composeFundSettingsUrl
} from "shared/utils/compose-url";
import { CurrencyEnum } from "shared/utils/types";

import FundDetailsHistorySection from "./fund-details-history-section/fund-details-history-section";
import FundDetailsStatisticSection from "./fund-details-statistics-section/fund-details-statistic-section";
import { IDescriptionSection } from "./fund-details.types";
import { fundEventsTableSelector } from "./reducers/fund-history.reducer";
import { dispatchFundDescription } from "./services/fund-details.service";
import { FUND_SETTINGS_FOLDER_ROUTE } from "shared/routes/invest.routes";
import { FUND_NOTIFICATIONS_FOLDER_ROUTE } from "shared/components/notifications/notifications.routes";

const _FundDetailsContainer: React.FC<Props> = ({
  descriptionSection,
  data: description
}) => {
  const [t] = useTranslation();
  const FundControls = descriptionSection.FundControls;
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  return (
    <Page title={description.title}>
      <DetailsDescriptionSection
        personalDetails={description.personalFundDetails}
        description={description}
        notificationsUrl={{
          as: composeFundNotificationsUrl(description.url),
          pathname: FUND_NOTIFICATIONS_FOLDER_ROUTE,
          state: `/ ${description.title}`
        }}
        settingsUrl={{
          as: composeFundSettingsUrl(description.url),
          pathname: FUND_SETTINGS_FOLDER_ROUTE,
          state: `/ ${description.title}`
        }}
        AssetDetailsExtraBlock={() => (
          <div className="details-description__info-block">
            <h4 className="details-description__subheading">
              <TooltipLabel
                tooltipContent={t("fund-details-page.tooltip.assets")}
                labelText={t("fund-details-page.description.assets")}
              />
            </h4>
            <div>
              <FundAssetContainer
                type={FUND_ASSET_TYPE.LARGE}
                assets={description.currentAssets}
                size={7}
              />
            </div>
          </div>
        )}
        AssetDetailsAvatar={() => (
          <div className="asset-details-description__avatar">
            <div className="details-description__avatar ">
              <AssetAvatar
                url={description.logo}
                alt={description.title}
                size="big"
                color={description.color}
              />
            </div>
          </div>
        )}
        Controls={() => (
          <FundControls
            fundDescription={description}
            isAuthenticated={isAuthenticated}
          />
        )}
      />
      <div className="details__divider" />
      <DetailsInvestment
        fees={{
          exitFee: description.exitFee,
          entryFee: description.entryFee,
          exitFeePersonal: description.personalFundDetails
            ? description.personalFundDetails.exitFeePersonal
            : 0
        }}
        dispatchDescription={dispatchFundDescription}
        eventTypesSelector={fundEventsSelector}
        asset={ASSET.FUND}
        selector={fundEventsTableSelector}
        id={description.id}
        currency={"GVT" as CurrencyEnum}
        personalDetails={description.personalFundDetails as InvestmentDetails}
        WithdrawContainer={descriptionSection.FundWithdrawalContainer}
      />
      <FundDetailsStatisticSection />
      <FundDetailsHistorySection id={description.id} />
    </Page>
  );
};

interface Props {
  descriptionSection: IDescriptionSection;
  data: FundDetailsFull;
}

const FundDetailsContainer = compose<
  React.ComponentType<Props & WithBlurLoaderProps<FundDetailsFull>>
>(
  withBlurLoader,
  React.memo
)(_FundDetailsContainer);
export default FundDetailsContainer;
