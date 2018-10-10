import Page from "components/page/page";
import React from "react";
import { translate } from "react-i18next";
import { GUID_REGEXP } from "utils/constants";
import replaceParams from "utils/replace-params";

import MananagerDescriptionContainer from "./components/manager-description/manager-description-container";

export const MANAGER_SLUG_URL_PARAM_NAME = "managerSlugUrl";

export const MANAGERS_ROUTE = "/managers";
export const MANAGER_DETAILS_ROUTE = `${MANAGERS_ROUTE}/:${MANAGER_SLUG_URL_PARAM_NAME}`;
export const MANAGER_DETAILS_ROUTE_REGEXP = `${MANAGERS_ROUTE}/:${MANAGER_SLUG_URL_PARAM_NAME}${GUID_REGEXP}`;

export const composeManagerDetailsUrl = slugUrl =>
  replaceParams(MANAGER_DETAILS_ROUTE, {
    [`:${MANAGER_SLUG_URL_PARAM_NAME}`]: slugUrl
  });

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
