import "shared/components/details/details-description-section/details-description/details-description.scss";

import { FundDetailsFull } from "gv-api-web";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import AssetAvatar from "shared/components/avatar/asset-avatar/asset-avatar";
import DetailsDescription from "shared/components/details/details-description-section/details-description/details-description";
import DetailsInvestment from "shared/components/details/details-description-section/details-investment/details-investment";
import { InvestmentDetails } from "shared/components/details/details-description-section/details-investment/details-investment.helpers";
import { FUND_ASSET_TYPE } from "shared/components/fund-asset/fund-asset";
import FundAssetContainer from "shared/components/fund-asset/fund-asset-container";
import { STATUS } from "shared/constants/constants";
import { FUND } from "shared/constants/constants";
import { composeFundNotificationsUrl } from "shared/utils/compose-url";

import {
  IFundControlsProps,
  IFundWithdrawalContainerProps
} from "../fund-details.types";

interface IFundDetailsDescriptionProps {
  fundDescription: FundDetailsFull;
  isAuthenticated: boolean;
  redirectToLogin(): void;
  FundControls: React.ComponentType<IFundControlsProps>;
  FundWithdrawContainer: React.ComponentType<IFundWithdrawalContainerProps>;
  accountCurrency: string;
}

class FundDetailsDescription extends React.PureComponent<
  IFundDetailsDescriptionProps & InjectedTranslateProps
> {
  render() {
    const {
      t,
      accountCurrency,
      isAuthenticated,
      redirectToLogin,
      fundDescription,
      FundControls,
      FundWithdrawContainer
    } = this.props;

    const { personalFundDetails } = fundDescription;

    const assetDescription = {
      id: fundDescription.id,
      title: fundDescription.title,
      description: fundDescription.description,
      logo: fundDescription.logo,
      notificationsUrl: composeFundNotificationsUrl(fundDescription.url),
      isFavorite: fundDescription.personalFundDetails.isFavorite,
      hasNotifications: fundDescription.personalFundDetails.hasNotifications,
      managerUrl: fundDescription.manager.url,
      managerName: fundDescription.manager.username
    };

    return (
      <div className="program-details-description">
        <DetailsDescription
          assetDescription={assetDescription}
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
              <h4 className="details-description__subheading">
                {t("fund-details-page.description.assets")}
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

        {personalFundDetails && personalFundDetails.status !== STATUS.ENDED && (
          <div className="program-details-description__additionally">
            <DetailsInvestment
              asset={FUND}
              id={fundDescription.id}
              assetCurrency={"GVT"}
              accountCurrency={accountCurrency}
              personalDetails={personalFundDetails as InvestmentDetails}
              WithdrawContainer={FundWithdrawContainer}
            />
          </div>
        )}
      </div>
    );
  }
}

export default translate()(FundDetailsDescription);
