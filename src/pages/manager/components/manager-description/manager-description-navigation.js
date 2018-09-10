import { GVButton } from "gv-react-components";
import React from "react";
import { translate } from "react-i18next";

const ManagerDescriptionNavigation = ({ t, goBack }) => {
  return (
    <div className="manager-description-navigation">
      <GVButton variant="text" onClick={goBack} color="secondary">
        <span className="manager-description-navigation__back-arrow">
          &larr;
        </span>
        {t("buttons.back")}
      </GVButton>
    </div>
  );
};

export default translate()(ManagerDescriptionNavigation);
