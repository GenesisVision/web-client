import "./manager-description.scss";

import ProfileAvatar from "components/avatar/profile-avatar/profile-avatar";
import { FUND_ASSET_TYPE } from "components/fund-asset/fund-asset";
import FundAssetContainer, {
  FundAssetType
} from "components/fund-asset/fund-asset-container";
import SocialLinksBlock from "components/social-links-block/social-links-block";
import StatisticItem from "components/statistic-item/statistic-item";
import { PublicProfile } from "gv-api-web";
import * as React from "react";
import { useTranslation } from "shared/i18n";
import { localizedDate } from "shared/utils/dates";

const _ManagerDescription: React.FC<Props> = ({ profile }) => {
  const { t } = useTranslation();
  return (
    <div className="manager-description">
      <div className="manager-description__left">
        <ProfileAvatar
          className="manager-description__avatar"
          url={profile.avatar}
          alt={profile.username}
        />
      </div>
      <div className="manager-description__main">
        <h1 className="title-small-padding">{profile.username}</h1>
        <div className="manager-description__date">
          {`${t("manager-page.member-since")} ${localizedDate(
            profile.regDate
          )}`}
        </div>
        <SocialLinksBlock socialLinks={profile.socialLinks} />
        <div className="manager-description__info">
          <h4 className="manager-description__subheading">
            {t("manager-page.about")}
          </h4>
          <div className="manager-description__text">{profile.about}</div>
          <div className="manager-description__short-statistic">
            <div className="manager-description__short-statistic-item">
              <StatisticItem label={t("manager-page.assets")}>
                <FundAssetContainer
                  assets={profile.assets.map(
                    (item: string) =>
                      ({
                        asset: item,
                        name: item,
                        percent: 0,
                        icon: ""
                      } as FundAssetType)
                  )}
                  type={FUND_ASSET_TYPE.TEXT}
                  size={profile.assets.length}
                />
              </StatisticItem>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface Props {
  profile: PublicProfile;
}

const ManagerDescription = React.memo(_ManagerDescription);
export default ManagerDescription;
