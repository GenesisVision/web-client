import "./manager-description.scss";

import ProfileAvatar from "components/avatar/profile-avatar/profile-avatar";
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
        <div className="manager-description__header">
          <h1 className="manager-description__heading">
            {managerProfile.username}
          </h1>
          <div className="manager-description__registration-date">
            {t("manager.member-since")}{" "}
            {moment(managerProfile.regDate).format("D MMM YY")}
          </div>
        </div>
        <div className="manager-description__info">
          <h3 className="manager-description__subheading">
            {t("manager.about")}
          </h3>
          <div className="manager-description__about">
            {managerProfile.about}
          </div>
        </div>
        <div className="manager-description__footer">
          <div className="manager-description__asset-heading">
            {t("manager.assets")}
          </div>
          <div className="manager-description__asset-items">
            {managerProfile.assets.join(", ")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default translate()(ManagerDescription);
