import { LevelInfo } from "gv-api-web";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import NumberFormat from "react-number-format";
import GVButton from "shared/components/gv-button";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { CURRENCIES } from "shared/modules/currency-select/currency-select.constants";
import { formatCurrencyValue } from "shared/utils/formatter";

import { fetchInvestmentsLevels } from "../services/program-details.service";
import AboutLevelsComponent from "./about-levels/about-levels";

class InvestmentLimitsPopover extends React.PureComponent<Props, State> {
  state: State = {
    investmentsLimits: undefined,
    isOpenAboutLevels: false
  };

  componentDidMount() {
    fetchInvestmentsLevels(this.props.currency).then(data => {
      this.setState({
        investmentsLimits: data.levels
      });
    });
  }

  handleOpenAboutLevels = () => {
    this.setState({ isOpenAboutLevels: true });
  };
  handleCloseAboutLevels = () => {
    this.setState({ isOpenAboutLevels: false });
    this.props.closePopover();
  };

  render() {
    const { t, level, canLevelUp, currency, limit } = this.props;
    const { investmentsLimits, isOpenAboutLevels } = this.state;

    if (!investmentsLimits) return null;

    const levelLimit = investmentsLimits.find(
      levelInfo => levelInfo.level === level
    )!.investmentLimit;

    return (
      <React.Fragment>
        <div className="popover-levels">
          <div className="popover-levels__block">
            <h4 className="popover-levels__title">
              {t("program-details-page.popover.genesis-level")} {level}
            </h4>
            <StatisticItem
              condition={canLevelUp}
              accent
              label={t("level-tooltip.level-up")}
            >
              {t("level-tooltip.top10")}
            </StatisticItem>

            <StatisticItem
              accent
              label={t("program-details-page.popover.invest-limit")}
            >
              <NumberFormat
                value={formatCurrencyValue(limit, currency)}
                thousandSeparator={" "}
                displayType="text"
                suffix={` ${currency}`}
              />
            </StatisticItem>
          </div>
          <div className="popover-levels__block popover-levels__text-block">
            <div className="popover-levels__text">
              {t("program-details-page.popover.text")}
            </div>
            <GVButton
              variant="text"
              onClick={this.handleOpenAboutLevels}
              color="secondary"
              className="popover-levels__about"
            >
              <React.Fragment>
                {t("program-details-page.popover.about-levels")} &#8250;
              </React.Fragment>
            </GVButton>
          </div>
        </div>
        <AboutLevelsComponent
          open={isOpenAboutLevels}
          onClose={this.handleCloseAboutLevels}
          currency={currency}
          investmentsLimits={investmentsLimits}
        />
      </React.Fragment>
    );
  }
}

export default translate()(InvestmentLimitsPopover);

interface OwnProps {
  currency: CURRENCIES;
  level: number;
  canLevelUp: boolean;
  closePopover(): void;
}

interface Props extends OwnProps, InjectedTranslateProps {
  limit: number;
}

interface State {
  isOpenAboutLevels: boolean;
  investmentsLimits?: LevelInfo[];
}
