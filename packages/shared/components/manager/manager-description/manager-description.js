import "./manager-description.scss";

import moment from "moment";
import React from "react";
import { translate } from "react-i18next";
import ProfileAvatar from "shared/components/avatar/profile-avatar/profile-avatar";
import FundAssetContainer from "shared/components/fund-asset/fund-asset-container";
import StatisticItem from "../../statistic-item/statistic-item";

const ManagerDescription = ({ t, managerProfile }) => {
  return (
    <div className="manager-description">
      <div className="manager-description__left">
        <ProfileAvatar
          className="manager-description__avatar"
          url={managerProfile.avatar}
          alt={managerProfile.username}
        />
      </div>
      <div className="manager-description__main">
        <h1 className="app__title-details">{managerProfile.username}</h1>
        <div className="manager-description__date">
          {`${t("manager.member-since")} ${moment(
            managerProfile.regDate
          ).format("D MMM YY")}`}
        </div>
        <div className="manager-description__info">
          <h4 className="manager-description__subheading">
            {t("manager.about")}
          </h4>
          <div className="manager-description__text">
            {managerProfile.about}
          </div>
          <div className="manager-description__short-statistic">
            <div className="manager-description__short-statistic-item">
              <StatisticItem label={t("manager.assets")}>
                <FundAssetContainer
                  assets={managerProfile.assets.map(item => {
                    return { asset: item };
                  })}
                  type={"text"}
                  size={managerProfile.assets.length}
                />
              </StatisticItem>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default translate()(ManagerDescription);
