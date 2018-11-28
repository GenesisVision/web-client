import "./programs-rating-stats.scss";

import React, { Fragment } from "react";
import { translate } from "react-i18next";
import { compose } from "redux";
import NumberFormat from "react-number-format";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { formatValue } from "shared/utils/formatter";
import Profitability from "shared/components/profitability/profitability";

const ProgramsRatingStats = ({ rating }) => {
  return (
    <Fragment>
      <div className="programs-rating-stats">
        <StatisticItem big accent label={"Programs"}>
          <NumberFormat
            value={formatValue(rating.counts)}
            thousandSeparator={" "}
            displayType="text"
          />
        </StatisticItem>
        <StatisticItem big accent label={"Quota"}>
          <NumberFormat
            value={formatValue(rating.quota)}
            thousandSeparator={" "}
            displayType="text"
          />
        </StatisticItem>
        <StatisticItem big accent label={"Current target profit"}>
          <Profitability value="24.54" prefix="sign">
            <NumberFormat
              value={formatValue(rating.currentProfit, 2)}
              suffix="%"
              allowNegative={false}
              displayType="text"
            />
          </Profitability>
        </StatisticItem>
      </div>
    </Fragment>
  );
};

export default compose(translate())(ProgramsRatingStats);
