import GVTabs from "components/gv-tabs";
import GVTab from "components/gv-tabs/gv-tab";
import Link from "components/link/link";
import isAuthenticated from "decorators/is-authenticated";
import { useRouter } from "next/router";
import * as React from "react";
import { WithTranslation, withTranslation } from "react-i18next";
import { compose } from "redux";
import replaceParams from "shared/utils/replace-params";

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
              {t("funds-page.tabs.explore")}
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
              {t("funds-page.tabs.favorites")}
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
