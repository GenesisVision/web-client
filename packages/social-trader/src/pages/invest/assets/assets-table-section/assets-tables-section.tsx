import GVTab from "components/gv-tabs/gv-tab";
import dynamic from "next/dynamic";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { isAuthenticatedSelector } from "reducers/auth-reducer";
import { RootState } from "reducers/root-reducer";
import useTab from "hooks/tab.hook";
import DetailsBlockTabs from "components/details/details-block-tabs";
import {
  GetItemsFuncActionType,
  TableSelectorType
} from "components/table/components/table.types";
import { DefaultTableBlock } from "components/default.block/default-table.block";

const AssetsCoins = dynamic(
  () => import("modules/assets-table/components/assets-table/assets-coins")
);

const AssetsPortfolio = dynamic(
  () => import("modules/assets-table/components/assets-portfolio-table/assets-portfolio")
);

export enum ASSETS_TABS {
  ASSETS = "",
  PORTFOLIO = "portfolio",
  HISTORY = "history"
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
  portfolio: TAssetsTableReduxData;
  history: TAssetsTableReduxData;
};

const _AssetsTradesSection: React.FC<Props> = ({
  tablesData: { assetsCoins, portfolio, history }
}) => {
  const [t] = useTranslation();
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const { tab, setTab } = useTab<ASSETS_TABS>(ASSETS_TABS.ASSETS);

  return (
    <DefaultTableBlock>
      <DetailsBlockTabs value={tab} onChange={setTab}>
        <GVTab
          value={ASSETS_TABS.ASSETS}
          label={t("assets-page:tabs.assets")}
          visible={isAuthenticated}
        />
        <GVTab
          value={ASSETS_TABS.PORTFOLIO}
          label={t("assets-page:tabs.portfolio")}
          visible={isAuthenticated}
        />
        <GVTab
          value={ASSETS_TABS.HISTORY}
          label={t("assets-page:tabs.history")}
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
      {tab === ASSETS_TABS.PORTFOLIO && (
        <AssetsPortfolio
          itemSelector={portfolio.itemSelector!}
          getItems={portfolio.getItems()}
          dataSelector={portfolio.dataSelector}
        />
      )}
    </DefaultTableBlock>
  );
};

const AssetsTradesSection = React.memo(_AssetsTradesSection);
export default AssetsTradesSection;
