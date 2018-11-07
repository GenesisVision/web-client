import "./back-button.scss";

import { GVButton } from "gv-react-components";
import React from "react";
import { translate } from "react-i18next";

const BackButton = ({ t, goBack, backPath }) => {
  return (
    <div className="back-button">
      <GVButton variant="text" onClick={goBack} color="secondary">
        <span className="back-button__back-arrow">&larr;</span>
        {t("buttons.back")}
      </GVButton>
      <div className="back-button__path">{backPath}</div>
    </div>
  );
};

export default translate()(BackButton);
