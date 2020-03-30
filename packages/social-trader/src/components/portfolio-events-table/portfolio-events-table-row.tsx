import { AvatarWithName } from "components/avatar/avatar-with-name/avatar-with-name";
import PortfolioEventLogo from "components/dashboard/dashboard-portfolio-events/dashboard-portfolio-event-logo/dashboard-portfolio-event-logo";
import Profitability from "components/profitability/profitability";
import { PROFITABILITY_PREFIX } from "components/profitability/profitability.helper";
import TableCell from "components/table/components/table-cell";
import TableRow from "components/table/components/table-row";
import { InvestmentEventViewModel } from "gv-api-web";
import { EVENT_LOCATION } from "pages/invest/programs/program-details/service/program-details.service";
import React from "react";
import NumberFormat from "react-number-format";
import { formatDate } from "utils/dates";
import { formatCurrencyValue } from "utils/formatter";

import PortfolioEventsDetails from "./portfolio-event-details";
import PortfolioEventFeesTooltip from "./portfolio-event-fees-tooltip";
import { EVENT_PROFITABILITY_VALUES } from "./portfolio-events-table.constants";

const _PortfolioEventsTableRow: React.FC<Props> = ({
  event,
  eventLocation,
  hideFeeColumn
}) => (
  <TableRow stripy>
    <TableCell>{formatDate(event.date)}</TableCell>
    <TableCell>
      <AvatarWithName
        avatar={
          event.assetDetails && (
            <PortfolioEventLogo
              withAsset={eventLocation !== EVENT_LOCATION.Asset}
              assetDetails={event.assetDetails}
              icon={event.logoUrl}
            />
          )
        }
        name={event.title}
      />
    </TableCell>
    {!hideFeeColumn && (
      <TableCell>
        <PortfolioEventFeesTooltip
          fees={event.feesInfo}
          condition={event.totalFeesAmount !== null}
        >
          <NumberFormat
            value={formatCurrencyValue(
              event.totalFeesAmount,
              event.totalFeesCurrency
            )}
            thousandSeparator=" "
            displayType="text"
            suffix={" " + event.totalFeesCurrency}
          />
        </PortfolioEventFeesTooltip>
      </TableCell>
    )}
    <TableCell>
      <PortfolioEventsDetails extendedInfo={event.extendedInfo} />
    </TableCell>
    <TableCell>
      <Profitability
        condition={!!event.amount}
        value={EVENT_PROFITABILITY_VALUES[event.changeState]}
        prefix={PROFITABILITY_PREFIX.SIGN}
      >
        <NumberFormat
          value={formatCurrencyValue(event.amount, event.currency)}
          allowNegative={false}
          thousandSeparator=" "
          displayType="text"
          suffix={` ${event.currency}`}
        />
      </Profitability>
    </TableCell>
  </TableRow>
);

const PortfolioEventsTableRow = React.memo(_PortfolioEventsTableRow);
export default PortfolioEventsTableRow;

interface Props {
  event: InvestmentEventViewModel;
  eventLocation: EVENT_LOCATION;
  hideFeeColumn: boolean;
}
