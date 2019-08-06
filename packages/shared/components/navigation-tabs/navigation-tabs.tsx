import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import { WithTranslation, withTranslation } from "react-i18next";
import GVTabs from "shared/components/gv-tabs";
import GVTab from "shared/components/gv-tabs/gv-tab";
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
              href={replaceParams(tabRoute, {
                ":tab": exploreTabName
              }).slice(0, -1)}
            >
              <a>{t("funds-page.tabs.explore")}</a>
            </Link>
          }
        />
        <GVTab
          value={favoritesTabName}
          label={
            <Link
              href={replaceParams(tabRoute, {
                ":tab": favoritesTabName
              })}
            >
              <a>{t("funds-page.tabs.favorites")}</a>
            </Link>
          }
        />
      </GVTabs>
    </div>
  );
};

interface Props extends WithTranslation {
  exploreTabName: string;
  tabRoute: string;
  favoritesTabName: string;
}

const NavigationTabs = withTranslation()(React.memo(_NavigationTabs));
export default NavigationTabs;
