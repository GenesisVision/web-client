import Page from "components/page/page";
import React from "react";
import { translate } from "react-i18next";
import { GUID_REGEXP } from "utils/constants";

import MananagerDescriptionContainer from "./components/manager-description/manager-description-container";

export const MANAGERS_ROUTE = "/managers";
export const MANAGER_DETAILS_ROUTE = `${MANAGERS_ROUTE}/:managerId`;
export const MANAGER_DETAILS_ROUTE_REGEXP = `${MANAGERS_ROUTE}/:managerId${GUID_REGEXP}`;

const ManagerPage = ({ t }) => {
  return (
    <Page title={t("program-details-page.title")}>
      <div className="manager">
        <div className="manager__description">
          <MananagerDescriptionContainer />
        </div>
      </div>
    </Page>
  );
};

export default translate()(ManagerPage);
