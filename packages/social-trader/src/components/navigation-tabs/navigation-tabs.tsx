import GVTabs from "components/gv-tabs";
import GVTab from "components/gv-tabs/gv-tab";
import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import isAuthenticated from "decorators/is-authenticated";
import { useRouter } from "next/router";
import * as React from "react";
import { useTranslation } from "react-i18next";
import replaceParams from "utils/replace-params";

const _NavigationTabs: React.FC<Props> = ({
  exploreTabName,
  tabRoute,
  favoritesTabName
}) => {
  const [t] = useTranslation();
  const { linkCreator } = useToLink();
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
              to={linkCreator(
                replaceParams(tabRoute, {
                  ":tab": exploreTabName
                }).slice(0, -1)
              )}
            >
              {t("funds-page.tabs.explore")}
            </Link>
          }
        />
        <GVTab
          value={favoritesTabName}
          label={
            <Link
              to={linkCreator(
                replaceParams(tabRoute, {
                  ":tab": favoritesTabName
                })
              )}
            >
              {t("funds-page.tabs.favorites")}
            </Link>
          }
        />
      </GVTabs>
    </div>
  );
};

interface Props {
  exploreTabName: string;
  tabRoute: string;
  favoritesTabName: string;
}

const NavigationTabs = React.memo(isAuthenticated(_NavigationTabs));
export default NavigationTabs;
