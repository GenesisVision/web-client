import "./manager-description.scss";

import classNames from "classnames";
import ManagerAvatar from "components/manager-avatar/manager-avatar";
import moment from "moment";
import React from "react";
import { translate } from "react-i18next";
import UserIcon from "shared/media/user-avatar.svg";

const ManagerDescription = ({ t, managerProfile }) => {
  const isAvatarExist =
    managerProfile.avatar && managerProfile.avatar != "string";

  return (
    <div className="manager-description">
      <div className="manager-description__right">
        <ManagerAvatar
          className="manager-description__avatar"
          avatarUrl={managerProfile.avatar}
        />
      </div>
      <div className="manager-description__main">
        <div className="manager-description__header">
          <h1 className="manager-description__heading">
            {managerProfile.username}
          </h1>
          <div className="manager-description__registration-date">
            Member since {moment(managerProfile.regDate).format("D MMM YY")}
          </div>
        </div>
        <div className="manager-description__info">
          <h3 className="manager-description__subheading">
            {t("manager.about")}
          </h3>
          <div className="manager-description__about">
            {managerProfile.about}
          </div>
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
