import "./dashboard-assets.scss";

import React, { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import DashboardFunds from "shared/components/dashboard/dashboard-assets/dashboard-funds/dashboard-funds";
import DashboardPrograms from "shared/components/dashboard/dashboard-assets/dashboard-programs/dashboard-programs";
import GVTabs from "shared/components/gv-tabs";
import GVTab from "shared/components/gv-tabs/gv-tab";
import Surface from "shared/components/surface/surface";
import { SortingColumn } from "shared/components/table/components/filtering/filter.type";
import { GetItemsFuncActionType } from "shared/components/table/components/table.types";
import useTab from "shared/hooks/tab.hook";
import useRole from "shared/hooks/use-role.hook";

const _DashboardAssets: React.FC<Props> = ({
  counts,
  getAssetsCounts,
  clearAssets,
  title,
  getDashboardPrograms,
  getDashboardFunds,
  createProgramButtonToolbar,
  createFundButtonToolbar,
  createFund,
  createProgram,
  programColumns
}) => {
  const { tab, setTab } = useTab<TABS>(TABS.PROGRAMS);
  const [t] = useTranslation();
  const role = useRole();
  useEffect(() => {
    getAssetsCounts();
    return clearAssets;
  }, [clearAssets, getAssetsCounts]);
  const handleTabChange = useCallback(
    (e: any, propTab: string) => {
      if (propTab === tab) return;
      setTab(e, propTab);
    },
    [setTab, tab]
  );
  const { fundsCount, programsCount } = counts;
  return (
    <Surface className="dashboard-assets">
      <div className="dashboard-assets__head">
        <h3>{t(`${role}.dashboard-page.assets.title`)}</h3>
        <div className="dashboard-assets__tabs">
          <GVTabs value={tab} onChange={handleTabChange}>
            <GVTab
              value={TABS.PROGRAMS}
              label={t(`${role}.dashboard-page.assets.programs`)}
              count={programsCount}
            />
            <GVTab
              value={TABS.FUNDS}
              label={t(`${role}.dashboard-page.assets.funds`)}
              count={fundsCount}
            />
          </GVTabs>
        </div>
      </div>
      <div className="dashboard-assets__table">
        {tab === TABS.PROGRAMS && (
          <DashboardPrograms
            columns={programColumns}
            getDashboardPrograms={getDashboardPrograms}
            createButtonToolbar={createProgramButtonToolbar}
            createProgram={createProgram}
            title={title}
          />
        )}
        {tab === TABS.FUNDS && (
          <DashboardFunds
            createButtonToolbar={createFundButtonToolbar}
            createFund={createFund}
            getDashboardFunds={getDashboardFunds}
            title={title}
          />
        )}
      </div>
    </Surface>
  );
};

interface Props {
  clearAssets: () => void;
  counts: any;
  getAssetsCounts: () => void;
  title: string;
  getDashboardPrograms: GetItemsFuncActionType;
  getDashboardFunds: GetItemsFuncActionType;
  createProgramButtonToolbar: JSX.Element;
  createFundButtonToolbar: JSX.Element;
  createFund: JSX.Element;
  createProgram: JSX.Element;
  programColumns: SortingColumn[];
}

enum TABS {
  PROGRAMS = "programs",
  FUNDS = "funds"
}

const DashboardAssets = React.memo(_DashboardAssets);
export default DashboardAssets;
