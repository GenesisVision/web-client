import "./manager-description.scss";

import ManagerAvatar from "components/manager-avatar/manager-avatar";
import { GVButton } from "gv-react-components";
import moment from "moment";
import React from "react";
import { translate } from "react-i18next";

const ManagerDescription = ({ t, managerProfile, goBack }) => {
  return (
    <div className="manager-description">
      <div className="manager-description__right">
        <GVButton
          className="manager-description__navigation-btn"
          variant="text"
          onClick={goBack}
          color="secondary"
        >
          <span className="manager-description__back-arrow">&larr;</span>
          <span className="manager-description__navigation-text">
            {t("buttons.back")}
          </span>
        </GVButton>
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
            {t("manager.member-since")}{" "}
            {moment(managerProfile.regDate).format("D MMM YY")}
          </div>
          <div className="manager-description__assets-mobile">
            <span className="manager-descrption__asset-mobile-title">
              {t("manager.assets")}
            </span>
            {managerProfile.assets.join(", ")}
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
