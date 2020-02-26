import DetailsBlock from "components/details/details-block";
import DetailsBlockTabs from "components/details/details-block-tabs";
import DetailsBlockTitleBox from "components/details/details-block-title-box";
import GVTab from "components/gv-tabs/gv-tab";
import ManagerPrograms from "components/manager/manager-history/manager-programs-table";
import useTab from "hooks/tab.hook";
import dynamic from "next/dynamic";
import * as React from "react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { MANAGER_HISTORY_TAB } from "../manager.constants";
import { fetchManagerAssetsCount } from "../services/manager.service";

const ManagerFollow = dynamic(() => import("./manager-follow-table"));
const ManagerFunds = dynamic(() => import("./manager-funds-table"));

const _ManagerHistorySection: React.FC<Props> = ({ ownerId, title }) => {
  const [t] = useTranslation();
  const { tab, setTab } = useTab<MANAGER_HISTORY_TAB>(
    MANAGER_HISTORY_TAB.PROGRAMS
  );
  const [followCount, setFollowCount] = useState(0);
  const [fundsCount, setFundsCount] = useState(0);
  const [programsCount, setProgramsCount] = useState(0);
  useEffect(() => {
    fetchManagerAssetsCount(ownerId).then(
      ({ followCount, fundsCount, programsCount }) => {
        setFollowCount(followCount);
        setProgramsCount(programsCount);
        setFundsCount(fundsCount);
      }
    );
  }, [ownerId]);
  return (
    <DetailsBlock table>
      <DetailsBlockTitleBox>
        <h3>{t("manager-page.assets")}</h3>
      </DetailsBlockTitleBox>
      <DetailsBlockTabs value={tab} onChange={setTab}>
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
        <GVTab
          value={MANAGER_HISTORY_TAB.FOLLOW}
          label={t("manager-page.history.tabs.follow")}
          count={followCount}
        />
      </DetailsBlockTabs>
      {tab === MANAGER_HISTORY_TAB.PROGRAMS && (
        <ManagerPrograms title={title} ownerId={ownerId} />
      )}
      {tab === MANAGER_HISTORY_TAB.FUNDS && (
        <ManagerFunds title={title} ownerId={ownerId} />
      )}
      {tab === MANAGER_HISTORY_TAB.FOLLOW && (
        <ManagerFollow title={title} ownerId={ownerId} />
      )}
    </DetailsBlock>
  );
};

interface Props {
  ownerId: string;
  title: string;
}

const ManagerHistorySection = React.memo(_ManagerHistorySection);
export default ManagerHistorySection;
