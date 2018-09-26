import { RingIcon } from "components/icon/ring-icon";
import React from "react";
import { translate } from "react-i18next";

const ProgramDetailsNotificaton = ({ t }) => {
  return (
    <div className="program-details-description__control">
      <RingIcon className="program-details-description__control-icon" />
      <div className="program-details-description__control-text">
        {t("program-details-page.description.notifications")}
      </div>
    </div>
  );
};

export default translate()(ProgramDetailsNotificaton);
