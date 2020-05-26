import GVButton, { GV_BTN_SIZE } from "components/gv-button";
import Popover, { HORIZONTAL_POPOVER_POS } from "components/popover/popover";
import { PopoverContentCardBlock } from "components/popover/popover-card.block";
import { PopoverContent } from "components/popover/popover-content";
import { TooltipLabel } from "components/tooltip-label/tooltip-label";
import Crashable from "decorators/crashable";
import { InvestmentEventItemViewModel } from "gv-api-web";
import useAnchor from "hooks/anchor.hook";
import React, { memo } from "react";
import { useTranslation } from "react-i18next";

import FeeCommission from "../fee-commission/fee-commission";
import "./portfolio-events-table.scss";

const _PortfolioEventsDetails: React.FC<Props> = ({ extendedInfo }) => {
  const { anchor, setAnchor, clearAnchor } = useAnchor();
  const [t] = useTranslation();
  if (extendedInfo.length === 0) return null;
  const renderInfoTitle = (title: string) => {
    return title === "Loss" || title === "Refund" ? (
      <TooltipLabel
        tooltipContent={t(
          `program-details-page.history.my-history.${title.toLowerCase()}`
        )}
        labelText={title}
      />
    ) : (
      title
    );
  };
  return (
    <div className="portfolio-event-details">
      <GVButton size={GV_BTN_SIZE.SMALL} color="secondary" onClick={setAnchor}>
        {t("program-details-page.history.my-history.details")}
      </GVButton>
      <Popover
        anchorEl={anchor}
        onClose={clearAnchor}
        horizontal={HORIZONTAL_POPOVER_POS.RIGHT}
        className="portfolio-event-details__popover"
      >
        <PopoverContent>
          <PopoverContentCardBlock size={"small"}>
            {extendedInfo.map((info, idx) => (
              <FeeCommission
                key={idx}
                title={renderInfoTitle(info.title)}
                value={info.amount}
                currency={info.currency}
              />
            ))}
          </PopoverContentCardBlock>
        </PopoverContent>
      </Popover>
    </div>
  );
};

const PortfolioEventsDetails = memo(Crashable(_PortfolioEventsDetails));
export default PortfolioEventsDetails;

interface Props {
  extendedInfo: InvestmentEventItemViewModel[];
}
