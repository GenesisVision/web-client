import "./manager-history.scss";

import * as React from "react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import GVTabs from "shared/components/gv-tabs";
import GVTab from "shared/components/gv-tabs/gv-tab";
import Surface from "shared/components/surface/surface";
import useTab from "shared/hooks/tab.hook";

import { MANAGER_HISTORY_TAB } from "../manager.constants";
import { fetchManagerAssetsCount } from "../services/manager.service";
import ManagerFunds from "./manager-funds-table";
import ManagerPrograms from "./manager-programs-table";

const _ManagerHistorySection: React.FC<Props> = ({ managerId, title }) => {
  const [t] = useTranslation();
  const { tab, setTab } = useTab<MANAGER_HISTORY_TAB>(
    MANAGER_HISTORY_TAB.PROGRAMS
  );
  const [fundsCount, setFundsCount] = useState(0);
  const [programsCount, setProgramsCount] = useState(0);
  useEffect(
    () => {
      fetchManagerAssetsCount(managerId).then(
        ({ fundsCount, programsCount }) => {
          setProgramsCount(programsCount);
          setFundsCount(fundsCount);
        }
      );
    },
    [managerId]
  );
  return (
    <Surface className="manager-history">
      <div className="manager-history__heading">
        <h3>{t("manager-page.assets")}</h3>
      </div>
      <div className="manager-history__tabs">
        <GVTabs value={tab} onChange={setTab}>
          <GVTab
            value={MANAGER_HISTORY_TAB.PROGRAMS}
            label={t("manager-page.history.tabs.programs")}
            count={programsCount}
          />
          <GVTab
            value={MANAGER_HISTORY_TAB.FUNDS}
            label={t("manager-page.history.tabs.funds")}
            count={fundsCount}
          />
        </GVTabs>
      </div>

      <div>
        {tab === MANAGER_HISTORY_TAB.PROGRAMS && (
          <ManagerPrograms title={title} managerId={managerId} />
        )}
        {tab === MANAGER_HISTORY_TAB.FUNDS && (
          <ManagerFunds title={title} managerId={managerId} />
        )}
      </div>
    </Surface>
  );
};

interface Props {
  managerId: string;
  title: string;
}

const ManagerHistorySection = React.memo(_ManagerHistorySection);
export default ManagerHistorySection;
