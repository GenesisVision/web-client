import { $facetTranslateSize } from "components/facet-cards/facet-card";
import GVTabs from "components/gv-tabs";
import GVTab from "components/gv-tabs/gv-tab";
import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import * as React from "react";
import styled from "styled-components";
import replaceParams from "utils/replace-params";
import { $paddingSmall } from "utils/style/sizes";
import { ASSETS_TAB_ROUTE, GV_ASSETS_ROUTE } from "routes/invest.routes";
import { useTranslation } from "i18n";

const Container = styled.div`
  padding-bottom: ${$paddingSmall - $facetTranslateSize}px;
`;

export enum ASSETS_TABS {
  ASSETS = "",
  PORTFOLIO = "portfolio",
  HISTORY = "history"
}

const AssetsTabs: React.FC<Props> = ({initialTab}) => {
  const { linkCreator } = useToLink();
  const [t] = useTranslation();

  return (
    <Container>
      <GVTabs value={initialTab}>
        <GVTab
          value={ASSETS_TABS.ASSETS}
          label={
            <Link noColor to={linkCreator(GV_ASSETS_ROUTE)}>
              {t("assets-page:tabs.assets")}
            </Link>
          }
        />
        <GVTab
          value={ASSETS_TABS.PORTFOLIO}
          label={
            <Link
              noColor
              to={linkCreator(
                replaceParams(ASSETS_TAB_ROUTE, {
                  ":tab": ASSETS_TABS.PORTFOLIO
                })
              )}
            >
              {t("assets-page:tabs.portfolio")}
            </Link>
          }
        />
        <GVTab
          value={ASSETS_TABS.HISTORY}
          label={
            <Link
              noColor
              to={linkCreator(
                replaceParams(ASSETS_TAB_ROUTE, {
                  ":tab": ASSETS_TABS.HISTORY
                })
              )}
            >
              {t("assets-page:tabs.history")}
            </Link>
          }
        />
      </GVTabs>
    </Container>
  );
};

interface Props {
  initialTab: ASSETS_TABS;
}

export default AssetsTabs;
