import classnames from "classnames";
import { InvestmentEventItemViewModel } from "gv-api-web";
import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import GVButton from "shared/components/gv-button";
import Popover, {
  HORIZONTAL_POPOVER_POS
} from "shared/components/popover/popover";
import useAnchor from "shared/hooks/anchor.hook";

import FeeCommission from "../fee-commission/fee-commission";

const _PortfolioEventsDetails: React.FC<Props> = ({ extendedInfo }) => {
  const { anchor, setAnchor, clearAnchor } = useAnchor();
  const [t] = useTranslation();
  let extendedInfo2 = [
    { title: "title", amount: 1000, currency: "ADA" },
    { title: "title", amount: 1000, currency: "ADA" }
  ];
  if (extendedInfo2.length === 0) return null;
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
        {extendedInfo2.map((info, idx) => (
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

const PortfolioEventsDetails = memo(_PortfolioEventsDetails);
export default PortfolioEventsDetails;

interface Props {
  extendedInfo: InvestmentEventItemViewModel[];
}
