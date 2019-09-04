import { useRouter } from "next/router";
import * as React from "react";
import { WithTranslation, withTranslation } from "react-i18next";
import { compose } from "redux";
import GVTabs from "shared/components/gv-tabs";
import GVTab from "shared/components/gv-tabs/gv-tab";
import Link from "shared/components/link/link";
import replaceParams from "shared/utils/replace-params";

import isAuthenticated from "../../decorators/is-authenticated";

const _NavigationTabs: React.FC<Props> = ({
  t,
  exploreTabName,
  tabRoute,
  favoritesTabName
}) => {
  const { pathname } = useRouter();
  const tab = pathname.includes(favoritesTabName)
    ? favoritesTabName
    : exploreTabName;
  return (
    <div className="facets-tabs">
      <GVTabs value={tab}>
        <GVTab
          value={exploreTabName}
          label={
            <Link
              to={{
                pathname: replaceParams(tabRoute, {
                  ":tab": exploreTabName
                }).slice(0, -1)
              }}
            >
              <a>{t("funds-page.tabs.explore")}</a>
            </Link>
          }
        />
        <GVTab
          value={favoritesTabName}
          label={
            <Link
              to={{
                pathname: replaceParams(tabRoute, {
                  ":tab": favoritesTabName
                })
              }}
            >
              <a>{t("funds-page.tabs.favorites")}</a>
            </Link>
          }
        />
      </GVTabs>
    </div>
  );
};

interface OwnProps {
  exploreTabName: string;
  tabRoute: string;
  favoritesTabName: string;
}

interface Props extends OwnProps, WithTranslation {}

const NavigationTabs = compose<React.FC<OwnProps>>(
  withTranslation(),
  React.memo,
  isAuthenticated
)(_NavigationTabs);
export default NavigationTabs;
