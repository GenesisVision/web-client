import "./manager.scss";

import React from "react";
import { translate } from "react-i18next";
import Page from "shared/components/page/page";

const ManagerView = ({ t, username, renderDescription, renderHistory }) => {
  return (
    <Page title={`${t("manager.title")} ${username}`}>
      <div className="manager">
        <div className="manager__description">{renderDescription()}</div>
        <div className="manager__history">{renderHistory()}</div>
      </div>
    </Page>
  );
};

export default translate()(ManagerView);
