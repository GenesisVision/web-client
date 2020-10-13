import { $facetTranslateSize } from "components/facet-cards/facet-card";
import GVTabs from "components/gv-tabs";
import GVTab from "components/gv-tabs/gv-tab";
import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import isAuthenticated from "decorators/is-authenticated";
import { useRouter } from "next/router";
import * as React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import replaceParams from "utils/replace-params";
import { $paddingSmall } from "utils/style/sizes";

const Container = styled.div`
  padding-bottom: ${$paddingSmall - $facetTranslateSize}px;
`;

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
    <Container>
      <GVTabs value={tab}>
        <GVTab
          value={exploreTabName}
          label={
            <Link
              noColor
              to={linkCreator(
                replaceParams(tabRoute, {
                  ":tab": exploreTabName
                }).slice(0, -1)
              )}
            >
              {t("asset-list:tabs.explore")}
            </Link>
          }
        />
        <GVTab
          value={favoritesTabName}
          label={
            <Link
              noColor
              to={linkCreator(
                replaceParams(tabRoute, {
                  ":tab": favoritesTabName
                })
              )}
            >
              {t("asset-list:tabs.favorites")}
            </Link>
          }
        />
      </GVTabs>
    </Container>
  );
};

interface Props {
  exploreTabName: string;
  tabRoute: string;
  favoritesTabName: string;
}

const NavigationTabs = React.memo(isAuthenticated(_NavigationTabs));
export default NavigationTabs;
