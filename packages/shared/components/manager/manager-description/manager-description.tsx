import "./manager-description.scss";

import { PublicProfile } from "gv-api-web";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import ProfileAvatar from "shared/components/avatar/profile-avatar/profile-avatar";
import { FUND_ASSET_TYPE } from "shared/components/fund-asset/fund-asset";
import FundAssetContainer from "shared/components/fund-asset/fund-asset-container";
import SocialLinksBlock from "shared/components/social-links-block/social-links-block";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { localizedDate } from "shared/utils/dates";

const _ManagerDescription: React.FC<
  { managerProfile: PublicProfile } & WithTranslation
> = ({ t, managerProfile }) => (
  <div className="manager-description">
    <div className="manager-description__left">
      <ProfileAvatar
        className="manager-description__avatar"
        url={managerProfile.avatar}
        alt={managerProfile.username}
      />
    </div>
    <div className="manager-description__main">
      <h1 className="title-small-padding">{managerProfile.username}</h1>
      <div className="manager-description__date">
        {`${t("manager-page.member-since")} ${localizedDate(
          managerProfile.regDate
        )}`}
      </div>
      <SocialLinksBlock socialLinks={managerProfile.socialLinks} />
      <div className="manager-description__info">
        <h4 className="manager-description__subheading">
          {t("manager-page.about")}
        </h4>
        <div className="manager-description__text">{managerProfile.about}</div>
        <div className="manager-description__short-statistic">
          <div className="manager-description__short-statistic-item">
            <StatisticItem label={t("manager-page.assets")}>
              <FundAssetContainer
                assets={managerProfile.assets.map(item => ({
                  asset: item,
                  name: item,
                  percent: 0,
                  icon: ""
                }))}
                type={FUND_ASSET_TYPE.TEXT}
                size={managerProfile.assets.length}
              />
            </StatisticItem>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ManagerDescription = translate()(React.memo(_ManagerDescription));
export default ManagerDescription;
