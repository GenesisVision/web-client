import { GVTab, GVTabs } from "gv-react-components";
import {
  PROGRAMS_EXPLORE_TAB_NAME,
  PROGRAMS_FAVORITES_TAB_NAME,
  PROGRAMS_TAB_ROUTE
} from "pages/programs/programs.routes";
import React from "react";
import { translate } from "react-i18next";
import { Link } from "react-router-dom";
import replaceParams from "utils/replace-params";

const ProgramsTabs = ({ t, tab = PROGRAMS_EXPLORE_TAB_NAME }) => {
  return (
    <GVTabs value={tab}>
      <GVTab
        value={PROGRAMS_EXPLORE_TAB_NAME}
        label={
          <Link
            to={replaceParams(PROGRAMS_TAB_ROUTE, {
              ":tab": PROGRAMS_EXPLORE_TAB_NAME
            })}
          >
            {t("programs-page.tabs.explore")}
          </Link>
        }
      />
      <GVTab
        value={PROGRAMS_FAVORITES_TAB_NAME}
        label={
          <Link
            to={replaceParams(PROGRAMS_TAB_ROUTE, {
              ":tab": PROGRAMS_FAVORITES_TAB_NAME
            })}
          >
            {t("programs-page.tabs.favorites")}
          </Link>
        }
      />
    </GVTabs>
  );
};

export default translate()(ProgramsTabs);
