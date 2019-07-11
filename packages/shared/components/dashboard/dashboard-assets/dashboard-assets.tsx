import "./dashboard-assets.scss";

import { IDashboardAssetsCounts } from "investor-web-portal/src/pages/dashboard/services/dashboard.service";
import React, { useCallback, useEffect, useState } from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import DashboardFunds from "shared/components/dashboard/dashboard-assets/dashboard-funds/dashboard-funds";
import DashboardPrograms from "shared/components/dashboard/dashboard-assets/dashboard-programs/dashboard-programs";
import GVTabs from "shared/components/gv-tabs";
import GVTab from "shared/components/gv-tabs/gv-tab";
import Surface from "shared/components/surface/surface";
import { SortingColumn } from "shared/components/table/components/filtering/filter.type";
import { GetItemsFuncActionType } from "shared/components/table/components/table.types";
import withRole, { WithRoleProps } from "shared/decorators/with-role";
import useTab from "shared/hooks/tab.hook";

const _DashboardAssets: React.FC<Props> = ({
  fetchAssetsCount,
  clearAssets,
  role,
  t,
  title,
  getDashboardPrograms,
  getDashboardFunds,
  createProgramButtonToolbar,
  createFundButtonToolbar,
  createFund,
  createProgram,
  programColumns
}) => {
  const [counts, setCounts] = useState<IDashboardAssetsCounts>({});
  const { tab, setTab } = useTab<TABS>(TABS.PROGRAMS);
  useEffect(() => {
    fetchAssetsCount().then(setCounts);
    return clearAssets;
  }, []);
  const handleTabChange = useCallback(
    (e: any, propTab: string) => {
      if (propTab === tab) return;
      clearAssets && clearAssets();
      setTab(e, propTab);
    },
    [tab]
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

interface Props extends WithTranslation, WithRoleProps, OwnProps {}

interface OwnProps {
  clearAssets: () => void;
  fetchAssetsCount: () => Promise<IDashboardAssetsCounts>;
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

const DashboardAssets = compose<React.ComponentType<OwnProps>>(
  withRole,
  translate(),
  React.memo
)(_DashboardAssets);
export default DashboardAssets;
