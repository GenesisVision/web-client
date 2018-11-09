import { GVTab, GVTabs } from "gv-react-components";
import React from "react";
import { translate } from "react-i18next";
import { Link } from "react-router-dom";
import replaceParams from "utils/replace-params";

import {
  FUNDS_EXPLORE_TAB_NAME,
  FUNDS_FAVORITES_TAB_NAME,
  FUNDS_TAB_ROUTE
} from "../../../funds.routes";

const FundsNavigationTabs = ({ t, tab = FUNDS_EXPLORE_TAB_NAME }) => {
  return (
    <GVTabs value={tab}>
      <GVTab
        value={FUNDS_EXPLORE_TAB_NAME}
        label={
          <Link
            to={replaceParams(FUNDS_TAB_ROUTE, {
              ":tab": FUNDS_EXPLORE_TAB_NAME
            })}
          >
            {t("funds-page.tabs.explore")}
          </Link>
        }
      />
      <GVTab
        value={FUNDS_FAVORITES_TAB_NAME}
        label={
          <Link
            to={replaceParams(FUNDS_TAB_ROUTE, {
              ":tab": FUNDS_FAVORITES_TAB_NAME
            })}
          >
            {t("funds-page.tabs.favorites")}
          </Link>
        }
      />
    </GVTabs>
  );
};

export default translate()(FundsNavigationTabs);
