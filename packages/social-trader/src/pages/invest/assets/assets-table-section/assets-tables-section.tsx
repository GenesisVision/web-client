import { DefaultTableBlock } from "components/default.block/default-table.block";
import DetailsBlockTabs from "components/details/details-block-tabs";
import GVTab from "components/gv-tabs/gv-tab";
import Link from "components/link/link";
import {
  GetItemsFuncActionType,
  TableSelectorType
} from "components/table/components/table.types";
import useDevelopmentFeature from "hooks/development-feature.hook";
import AssetsHistory from "modules/assets-table/components/assets-history-table/assets-history";
import AssetsPortfolio from "modules/assets-table/components/assets-portfolio-table/assets-portfolio";
import AssetsCoins from "modules/assets-table/components/assets-table/assets-coins";
import dynamic from "next/dynamic";
import useHashTab from "pages/wallet/services/hashTab.hook";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { isAuthenticatedSelector } from "reducers/auth-reducer";
import { RootState } from "reducers/root-reducer";
import { GV_ASSETS_ROUTE } from "routes/invest.routes";

export enum ASSETS_TABS {
  ASSETS = "",
  FAVOURITES = "#favourites",
  PORTFOLIO = "#portfolio",
  HISTORY = "#history"
}

interface Props {
  tablesData: TAssetsTablesData;
}

export type TAssetsTableReduxData = {
  getItems: () => GetItemsFuncActionType;
  dataSelector: TableSelectorType;
  itemSelector?: (state: RootState) => { [keys: string]: any };
};

export type TAssetsTablesData = {
  assetsCoins: TAssetsTableReduxData;
  favourites: TAssetsTableReduxData;
  portfolio: TAssetsTableReduxData;
  history: TAssetsTableReduxData;
};

const _AssetsTablesSection: React.FC<Props> = ({
  tablesData: { assetsCoins, favourites, portfolio, history }
}) => {
  const [t] = useTranslation();
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const { tab } = useHashTab<ASSETS_TABS>(ASSETS_TABS.ASSETS);

  return (
    <DefaultTableBlock>
      <DetailsBlockTabs value={tab}>
        <GVTab
          value={ASSETS_TABS.ASSETS}
          label={
            <Link noColor to={`${GV_ASSETS_ROUTE}${ASSETS_TABS.ASSETS}`}>
              {t("assets-page:tabs.assets")}
            </Link>
          }
          visible={isAuthenticated}
        />
        <GVTab
          value={ASSETS_TABS.FAVOURITES}
          label={
            <Link noColor to={`${GV_ASSETS_ROUTE}${ASSETS_TABS.FAVOURITES}`}>
              {t("assets-page:tabs.favourites")}
            </Link>
          }
          visible={isAuthenticated}
        />
        <GVTab
          value={ASSETS_TABS.PORTFOLIO}
          label={
            <Link noColor to={`${GV_ASSETS_ROUTE}${ASSETS_TABS.PORTFOLIO}`}>
              {t("assets-page:tabs.portfolio")}
            </Link>
          }
          visible={isAuthenticated}
        />
        <GVTab
          value={ASSETS_TABS.HISTORY}
          label={
            <Link noColor to={`${GV_ASSETS_ROUTE}${ASSETS_TABS.HISTORY}`}>
              {t("assets-page:tabs.history")}
            </Link>
          }
          visible={isAuthenticated}
        />
      </DetailsBlockTabs>
      {(tab === ASSETS_TABS.ASSETS || !isAuthenticated) && (
        <AssetsCoins
          itemSelector={assetsCoins.itemSelector!}
          getItems={assetsCoins.getItems()}
          dataSelector={assetsCoins.dataSelector}
        />
      )}
      {tab === ASSETS_TABS.FAVOURITES && (
        <AssetsCoins
          itemSelector={favourites.itemSelector!}
          getItems={favourites.getItems()}
          dataSelector={favourites.dataSelector}
        />
      )}
      {tab === ASSETS_TABS.PORTFOLIO && (
        <AssetsPortfolio
          itemSelector={portfolio.itemSelector!}
          getItems={portfolio.getItems()}
          dataSelector={portfolio.dataSelector}
        />
      )}
      {tab === ASSETS_TABS.HISTORY && (
        <AssetsHistory
          itemSelector={history.itemSelector!}
          getItems={history.getItems()}
          dataSelector={history.dataSelector}
        />
      )}
    </DefaultTableBlock>
  );
};

const AssetsTablesSection = React.memo(_AssetsTablesSection);
export default AssetsTablesSection;
