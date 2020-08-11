import { Button } from "components/button/button";
import Popover, { HORIZONTAL_POPOVER_POS } from "components/popover/popover";
import { PopoverContentCardBlock } from "components/popover/popover-card.block";
import { PopoverContent } from "components/popover/popover-content";
import { Row } from "components/row/row";
import { TooltipLabel } from "components/tooltip-label/tooltip-label";
import Crashable from "decorators/crashable";
import { InvestmentEventItemViewModel } from "gv-api-web";
import useAnchor from "hooks/anchor.hook";
import React, { memo } from "react";
import { useTranslation } from "react-i18next";

import FeeCommission from "../fee-commission/fee-commission";

const _PortfolioEventsDetails: React.FC<Props> = ({ extendedInfo }) => {
  const { anchor, setAnchor, clearAnchor } = useAnchor();
  const [t] = useTranslation();
  if (extendedInfo.length === 0) return null;
  const renderInfoTitle = (title: string) => {
    return title === "Loss" || title === "Refund" ? (
      <TooltipLabel
        tooltipContent={t(`my-history.${title.toLowerCase()}`)}
        labelText={title}
      />
    ) : (
      title
    );
  };
  return (
    <div>
      <Button size={"small"} color="secondary" onClick={setAnchor}>
        {t("my-history.details")}
      </Button>
      <Popover
        anchorEl={anchor}
        onClose={clearAnchor}
        horizontal={HORIZONTAL_POPOVER_POS.RIGHT}
      >
        <PopoverContent>
          <PopoverContentCardBlock size={"small"}>
            {extendedInfo.map((info, idx) => (
              <Row key={idx} size={"small"}>
                <FeeCommission
                  title={renderInfoTitle(info.title)}
                  value={info.amount}
                  currency={info.currency}
                />
              </Row>
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
