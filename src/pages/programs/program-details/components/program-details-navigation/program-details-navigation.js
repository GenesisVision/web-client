import "./program-details-navigation.scss";

import { GVButton } from "gv-react-components";
import React from "react";
import { translate } from "react-i18next";

const ProgramDetailsNavigation = ({ t, goBack }) => {
  return (
    <div className="program-details-navigation">
      <GVButton variant="text" onClick={goBack} color="secondary">
        <span className="program-details-navigation__back-arrow">&larr;</span>
        {t("buttons.back")}
      </GVButton>
    </div>
  );
};

export default translate()(ProgramDetailsNavigation);
