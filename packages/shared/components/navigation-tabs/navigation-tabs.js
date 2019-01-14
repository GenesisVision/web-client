import { GVTab, GVTabs } from "gv-react-components";
import React from "react";
import { translate } from "react-i18next";
import { Link } from "react-router-dom";
import replaceParams from "shared/utils/replace-params";

const NavigationTabs = ({
  t,
  exploreTabName,
  fundsTabRoute,
  fundsFavoritesTabName,
  tab = exploreTabName
}) => {
  return (
    <div className="facets-tabs">
      <GVTabs value={tab}>
        <GVTab
          value={exploreTabName}
          label={
            <Link
              to={replaceParams(fundsTabRoute, {
                ":tab": exploreTabName
              })}
            >
              {t("funds-page.tabs.explore")}
            </Link>
          }
        />
        <GVTab
          value={fundsFavoritesTabName}
          label={
            <Link
              to={replaceParams(fundsTabRoute, {
                ":tab": fundsFavoritesTabName
              })}
            >
              {t("funds-page.tabs.favorites")}
            </Link>
          }
        />
      </GVTabs>
    </div>
  );
};

export default translate()(NavigationTabs);
