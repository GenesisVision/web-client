import "shared/components/details/details-description-section/details-statistic-section/details-history/details-history.scss";

import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import DetailsBlock from "shared/components/details/details-block";
import GVTabs from "shared/components/gv-tabs";
import GVTab from "shared/components/gv-tabs/gv-tab";
import { TooltipLabel } from "shared/components/tooltip-label/tooltip-label";
import useTab from "shared/hooks/tab.hook";

import { fundReallocateHistoryTableSelector } from "../reducers/fund-reallocate-history.reducer";
import { getDashboardHistoryDetailsCounts } from "../services/fund-details.service";
import FundReallocateHistory from "./fund-reallocate-history/fund-reallocate-history";
import FundStructure from "./fund-structure/fund-structure";

const _FundDetailsHistorySection: React.FC<Props> = ({ id }) => {
  const [t] = useTranslation();
  const { tab, setTab } = useTab<TABS>(TABS.STRUCTURE);
  const dispatch = useDispatch();
  const reallocateCount = useSelector(fundReallocateHistoryTableSelector)
    .itemsData.data.total;

  useEffect(
    () => {
      dispatch(getDashboardHistoryDetailsCounts(id));
    },
    [id]
  );

  return (
    <DetailsBlock table>
      <div className="details-history__header">
        <div className="details-history__tabs">
          <GVTabs value={tab} onChange={setTab}>
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
          </GVTabs>
        </div>
      </div>
      <div>
        {tab === TABS.STRUCTURE && <FundStructure id={id} />}
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
