import classnames from "classnames";
import GVButton from "components/gv-button";
import Popover, { HORIZONTAL_POPOVER_POS } from "components/popover/popover";
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
  return (
    <div className="portfolio-event-details">
      <GVButton
        variant="text"
        color="secondary"
        className={classnames("portfolio-event-details__button", {
          "portfolio-event-details__button--active": !!anchor
        })}
        onClick={setAnchor}
      >
        {t("Details")}
      </GVButton>
      <Popover
        anchorEl={anchor}
        onClose={clearAnchor}
        horizontal={HORIZONTAL_POPOVER_POS.RIGHT}
        className="portfolio-event-details__popover"
      >
        {extendedInfo.map((info, idx) => (
          <FeeCommission
            key={idx}
            title={info.title}
            value={info.amount}
            currency={info.currency}
          />
        ))}
      </Popover>
    </div>
  );
};

const PortfolioEventsDetails = memo(Crashable(_PortfolioEventsDetails));
export default PortfolioEventsDetails;

interface Props {
  extendedInfo: InvestmentEventItemViewModel[];
}
