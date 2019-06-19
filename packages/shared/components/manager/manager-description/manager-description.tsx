import "./manager-description.scss";

import { ManagerProfile } from "gv-api-web";
import moment from "moment";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import ProfileAvatar from "shared/components/avatar/profile-avatar/profile-avatar";
import SocialLinkImage from "shared/components/avatar/social-link/social-link";
import { FUND_ASSET_TYPE } from "shared/components/fund-asset/fund-asset";
import FundAssetContainer from "shared/components/fund-asset/fund-asset-container";
import StatisticItem from "shared/components/statistic-item/statistic-item";

const _ManagerDescription: React.FC<
  { managerProfile: ManagerProfile } & InjectedTranslateProps
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
        {`${t("manager-page.member-since")} ${moment(
          managerProfile.regDate
        ).format("ll")}`}
      </div>
      <div className="manager-description__social-links">
        {managerProfile.socialLinks.map(socialLink => (
          <a
            key={socialLink.type}
            href={socialLink.url + socialLink.value}
            target="_blank"
            rel="noopener noreferrer"
            className="manager-description__social-link"
          >
            <SocialLinkImage url={socialLink.logo} alt={socialLink.name} />
          </a>
        ))}
      </div>
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
