import "shared/components/details/details-description-section/details-description/details-description.scss";

import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import AssetAvatar from "shared/components/avatar/asset-avatar/asset-avatar";
import DetailsDescription from "shared/components/details/details-description-section/details-description/details-description";
import DetailsInvestment from "shared/components/details/details-description-section/details-investment/details-investment";
import { FUND_ASSET_TYPE } from "shared/components/fund-asset/fund-asset";
import FundAssetContainer from "shared/components/fund-asset/fund-asset-container";
import { STATUS } from "shared/constants/constants";
import { composeFundNotificationsUrl } from "shared/utils/compose-url";

import { FUND } from "../../../../constants/constants";

interface IFundDetailsDescriptionProps {
  fundDescription: any;
  isAuthenticated: any;
  redirectToLogin: any;
  FundControls: React.ComponentType<any>;
  FundWithdrawContainer: React.ComponentType<any>;
}

class FundDetailsDescription extends React.PureComponent<
  IFundDetailsDescriptionProps & InjectedTranslateProps
> {
  render() {
    const {
      t,
      isAuthenticated,
      redirectToLogin,
      fundDescription,
      FundControls,
      FundWithdrawContainer
    } = this.props;

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
      <React.Fragment>
        <DetailsDescription
          assetDescription={assetDescription}
          AssetDetailsAvatar={() => (
            <div className="details-description__avatar">
              <AssetAvatar
                url={fundDescription.logo}
                level={fundDescription.level}
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

        {fundDescription.personalFundDetails && status !== STATUS.ENDED && (
          <div className="program-details-description__additionally">
            <DetailsInvestment
              WithdrawContainer={FundWithdrawContainer}
              programDetails={fundDescription}
              asset={FUND}
            />
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default translate()(FundDetailsDescription);
