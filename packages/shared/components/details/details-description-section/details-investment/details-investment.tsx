import "./details-investment.scss";

import * as React from "react";
import { useTranslation } from "react-i18next";
import { ASSET } from "shared/components/../constants/constants";
import { IFundWithdrawalContainerProps } from "shared/components/funds/fund-details/fund-details.types";
import GVTabs from "shared/components/gv-tabs";
import GVTab from "shared/components/gv-tabs/gv-tab";
import PortfolioEventsTable from "shared/components/portfolio-events-table/portfolio-events-table";
import { IProgramReinvestingContainerOwnProps } from "shared/components/programs/program-details/program-details.types";
import {
  EVENT_LOCATION,
  getEvents
} from "shared/components/programs/program-details/services/program-details.service";
import Surface from "shared/components/surface/surface";
import { SelectFilterValue } from "shared/components/table/components/filtering/filter.type";
import { TableSelectorType } from "shared/components/table/components/table.types";
import useTab from "shared/hooks/tab.hook";
import { CurrencyEnum } from "shared/utils/types";

import { InvestmentDetails } from "./details-investment.helpers";
import InvestmentContainer from "./investment-container";

const _DetailsInvestment: React.FC<Props> = ({
  selector,
  haveEvents,
  haveInvestment,
  eventTypeFilterValues = [],
  updateDescription,
  id,
  assetCurrency,
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
          assetCurrency={assetCurrency}
          personalDetails={personalDetails}
          WithdrawContainer={WithdrawContainer}
          ProgramReinvestingWidget={ProgramReinvestingWidget}
        />
      )}
      {tab === TABS.EVENTS && (
        <PortfolioEventsTable
          getItems={getEvents(id!, EVENT_LOCATION.Asset)}
          selector={selector}
          asset={asset}
          eventLocation={EVENT_LOCATION.Asset}
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
  selector: TableSelectorType;
  haveEvents: boolean;
  haveInvestment: boolean;
  eventTypeFilterValues: SelectFilterValue[];
  updateDescription: () => void;
  asset: ASSET;
  notice?: string;
  id: string;
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
