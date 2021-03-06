import { DefaultTableBlock } from "components/default.block/default-table.block";
import DetailsBlockTabs from "components/details/details-block-tabs";
import GVTab from "components/gv-tabs/gv-tab";
import { TooltipLabel } from "components/tooltip-label/tooltip-label";
import useTab from "hooks/tab.hook";
import dynamic from "next/dynamic";
import { fundHistoryTableTableSelector } from "pages/invest/funds/fund-details/reducers/fund-history-table.reducer";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { getDashboardHistoryDetailsCounts } from "../services/fund-details.service";

const FundStructure = dynamic(() =>
  import(
    "pages/invest/funds/fund-details/fund-details-history-section/fund-structure/fund-structure"
  )
);
const FundHistory = dynamic(() => import("./fund-history/fund-history"));

const _FundDetailsHistorySection: React.FC<Props> = ({ id }) => {
  const [t] = useTranslation();
  const { tab, setTab } = useTab<TABS>(TABS.STRUCTURE);
  const dispatch = useDispatch();
  const historyCount = useSelector(fundHistoryTableTableSelector).itemsData.data
    .total;

  useEffect(() => {
    id && dispatch(getDashboardHistoryDetailsCounts(id));
  }, [dispatch, id]);

  return (
    <DefaultTableBlock>
      <DetailsBlockTabs value={tab} onChange={setTab}>
        <GVTab
          value={TABS.STRUCTURE}
          label={
            <TooltipLabel
              tooltipContent={t("fund-details-page:tooltip.structure")}
              labelText={t("fund-details-page:history.tabs.structure")}
              pointer
            />
          }
        />
        <GVTab
          value={TABS.HISTORY}
          label={t("fund-details-page:history.tabs.history")}
          count={historyCount}
        />
      </DetailsBlockTabs>
      <div>
        {tab === TABS.STRUCTURE && <FundStructure />}
        {tab === TABS.HISTORY && <FundHistory id={id} />}
      </div>
    </DefaultTableBlock>
  );
};

enum TABS {
  HISTORY = "history",
  STRUCTURE = "structure"
}

interface Props extends OwnProps {}

interface OwnProps {
  id: string;
}

const FundDetailsHistorySection = React.memo(_FundDetailsHistorySection);
export default FundDetailsHistorySection;
