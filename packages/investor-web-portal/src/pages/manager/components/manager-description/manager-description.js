import "./manager-description.scss";

import ProfileAvatar from "components/avatar/profile-avatar/profile-avatar";
import FundAssetContainer from "components/fund-asset/fund-asset-container";
import moment from "moment";
import React from "react";
import { translate } from "react-i18next";

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
        <div className="manager-description__heading">
          {managerProfile.username}
        </div>
        <div className="manager-description__date">
          {`${t("manager.member-since")} ${moment(
            managerProfile.regDate
          ).format("D MMM YY")}`}
        </div>
        <div className="manager-description__info">
          <div className="manager-description__subheading">
            {t("manager.about")}
          </div>
          <div className="manager-description__text">
            {managerProfile.about}
          </div>
          <div className="manager-description__short-statistic">
            <div className="manager-description__short-statistic-item">
              <span className="manager-description__short-statistic-subheading">
                {t("manager.assets")}
              </span>
              <FundAssetContainer
                assets={managerProfile.assets.map(item => {
                  return { asset: item };
                })}
                type={"text"}
                size={managerProfile.assets.length}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default translate()(ManagerDescription);
