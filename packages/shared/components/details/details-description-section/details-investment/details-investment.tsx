import "./details-investment.scss";

import * as React from "react";
import { useTranslation } from "react-i18next";
import { ASSET } from "shared/components/../constants/constants";
import { IFundWithdrawalContainerProps } from "shared/components/funds/fund-details/fund-details.types";
import GVTabs from "shared/components/gv-tabs";
import GVTab from "shared/components/gv-tabs/gv-tab";
import PortfolioEventsTable from "shared/components/portfolio-events-table/portfolio-events-table";
import { IProgramReinvestingContainerOwnProps } from "shared/components/programs/program-details/program-details.types";
import { EVENT_LOCATION } from "shared/components/programs/program-details/services/program-details.service";
import Surface from "shared/components/surface/surface";
import { DEFAULT_DATE_RANGE_FILTER_VALUE } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import { EVENT_TYPE_FILTER_DEFAULT_VALUE } from "shared/components/table/components/filtering/event-type-filter/event-type-filter.constants";
import { SelectFilterValue } from "shared/components/table/components/filtering/filter.type";
import { GetItemsFuncType } from "shared/components/table/components/table.types";
import useTab from "shared/hooks/tab.hook";
import { CurrencyEnum } from "shared/utils/types";

import { InvestmentDetails } from "./details-investment.helpers";
import InvestmentContainer from "./investment-container";

const EVENTS_FILTERING = {
  dateRange: DEFAULT_DATE_RANGE_FILTER_VALUE,
  type: EVENT_TYPE_FILTER_DEFAULT_VALUE
};

const _DetailsInvestment: React.FC<Props> = ({
  haveEvents,
  haveInvestment,
  fetchPortfolioEvents,
  eventTypeFilterValues = [],
  updateDescription,
  id,
  assetCurrency,
  accountCurrency,
  asset,
  notice,
  personalDetails,
  WithdrawContainer,
  ProgramReinvestingWidget
}) => {
  const [t] = useTranslation();
  const { tab, setTab } = useTab<TABS>(
    haveInvestment ? TABS.INVESTMENT : TABS.EVENTS
  );
  return (
    <Surface className="details-investment">
      <div className="details-investment__investment-tabs">
        <GVTabs value={tab} onChange={setTab}>
          <GVTab
            visible={haveInvestment}
            value={TABS.INVESTMENT}
            label={t(`fund-details-page.description.yourInvestment.${asset}`)}
          />
          <GVTab
            visible={haveEvents}
            value={TABS.EVENTS}
            label={t("program-details-page.history.tabs.events")}
          />
        </GVTabs>
      </div>
      {tab === TABS.INVESTMENT && (
        <InvestmentContainer
          updateDescription={updateDescription}
          asset={asset}
          notice={notice}
          id={id}
          accountCurrency={accountCurrency}
          assetCurrency={assetCurrency}
          personalDetails={personalDetails}
          WithdrawContainer={WithdrawContainer}
          ProgramReinvestingWidget={ProgramReinvestingWidget}
        />
      )}
      {tab === TABS.EVENTS && (
        <PortfolioEventsTable
          eventLocation={EVENT_LOCATION.Asset}
          filtering={EVENTS_FILTERING}
          fetchPortfolioEvents={fetchPortfolioEvents!}
          dateRangeStartLabel={t("filters.date-range.program-start")}
          eventTypeFilterValues={eventTypeFilterValues!}
        />
      )}
    </Surface>
  );
};

enum TABS {
  INVESTMENT = "INVESTMENT",
  EVENTS = "EVENTS"
}

interface OwnProps {
  haveEvents: boolean;
  haveInvestment: boolean;
  fetchPortfolioEvents: GetItemsFuncType;
  eventTypeFilterValues: SelectFilterValue[];
  updateDescription: () => void;
  asset: ASSET;
  notice?: string;
  id: string;
  accountCurrency: CurrencyEnum;
  assetCurrency: CurrencyEnum;
  personalDetails: InvestmentDetails;
  WithdrawContainer: React.ComponentType<IFundWithdrawalContainerProps>;
  ProgramReinvestingWidget?: React.ComponentType<
    IProgramReinvestingContainerOwnProps
  >;
}

interface Props extends OwnProps {}

const DetailsInvestment = React.memo(_DetailsInvestment);
export default DetailsInvestment;
