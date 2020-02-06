import "components/details/details-description-section/details-statistic-section/details-history/details-history.scss";

import DetailsBlock from "components/details/details-block";
import DetailsBlockTabs from "components/details/details-block-tabs";
import GVTab from "components/gv-tabs/gv-tab";
import { TooltipLabel } from "components/tooltip-label/tooltip-label";
import useTab from "hooks/tab.hook";
import dynamic from "next/dynamic";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { fundReallocateHistoryTableSelector } from "../reducers/fund-reallocate-history.reducer";
import { getDashboardHistoryDetailsCounts } from "../services/fund-details.service";

const FundStructure = dynamic(() =>
  import(
    "pages/invest/funds/fund-details/fund-details-history-section/fund-structure/fund-structure"
  )
);
const FundReallocateHistory = dynamic(() =>
  import("./fund-reallocate-history/fund-reallocate-history")
);

const _FundDetailsHistorySection: React.FC<Props> = ({ id }) => {
  const [t] = useTranslation();
  const { tab, setTab } = useTab<TABS>(TABS.STRUCTURE);
  const dispatch = useDispatch();
  const reallocateCount = useSelector(fundReallocateHistoryTableSelector)
    .itemsData.data.total;

  useEffect(() => {
    id && dispatch(getDashboardHistoryDetailsCounts(id));
  }, [dispatch, id]);

  return (
    <DetailsBlock table>
      <DetailsBlockTabs value={tab} onChange={setTab}>
        <GVTab
          value={TABS.STRUCTURE}
          label={
            <TooltipLabel
              tooltipContent={t("fund-details-page.tooltip.structure")}
              labelText={t("fund-details-page.history.tabs.structure")}
              className="tooltip__label--cursor-pointer"
            />
          }
        />
        <GVTab
          value={TABS.REALLOCATE_HISTORY}
          label={t("fund-details-page.history.tabs.reallocate-history")}
          count={reallocateCount}
        />
      </DetailsBlockTabs>
      <div>
        {tab === TABS.STRUCTURE && <FundStructure />}
        {tab === TABS.REALLOCATE_HISTORY && <FundReallocateHistory id={id} />}
      </div>
    </DetailsBlock>
  );
};

enum TABS {
  STRUCTURE = "structure",
  REALLOCATE_HISTORY = "reallocate history"
}

interface Props extends OwnProps {}

interface OwnProps {
  id: string;
}

const FundDetailsHistorySection = React.memo(_FundDetailsHistorySection);
export default FundDetailsHistorySection;
