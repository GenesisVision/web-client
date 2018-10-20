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
        <div className="manager-description__author-btn">
          {`${t("manager.member-since")} ${moment(
            managerProfile.regDate
          ).format("D MMM YY")}`}
        </div>
        <div className="manager-description__info">
          <div className="manager-description__subheading">
            {t("manager.about")}
          </div>
          <div className="manager-description__text">
            {managerProfile.about ||
              "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"}
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
