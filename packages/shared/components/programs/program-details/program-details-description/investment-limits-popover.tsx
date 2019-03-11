import { LevelInfo } from "gv-api-web";
import { GVButton } from "gv-react-components";
import React, { Fragment, PureComponent } from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import NumberFormat from "react-number-format";
import AboutLevelsComponent from "shared/components/about-levels/about-levels";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { formatCurrencyValue } from "shared/utils/formatter";

import { fetchInvestmentsLevels } from "../services/program-details.service";

interface IInvestmentLimitsPopoverOwnProps {
  currency: string;
  level: number;
  canLevelUp: boolean;
  closePopover(): void;
}

interface IInvestmentLimitsPopoverProps
  extends IInvestmentLimitsPopoverOwnProps,
    InjectedTranslateProps {}

interface IInvestmentLimitsPopoverState {
  investmentsLimits?: LevelInfo[];
  isOpenAboutLevels: boolean;
}

class InvestmentLimitsPopover extends PureComponent<
  IInvestmentLimitsPopoverProps,
  IInvestmentLimitsPopoverState
> {
  constructor(props: IInvestmentLimitsPopoverProps) {
    super(props);
    this.state = {
      investmentsLimits: undefined,
      isOpenAboutLevels: false
    };
  }

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
    const { t, level, canLevelUp, currency } = this.props;
    const { investmentsLimits, isOpenAboutLevels } = this.state;

    if (!investmentsLimits) return null;

    const levelLimit = investmentsLimits.find(
      levelInfo => levelInfo.level === level
    )!.investmentLimit;

    return (
      <Fragment>
        <div className="popover-levels">
          <div className="popover-levels__block">
            <h4 className="popover-levels__title">
              {t("program-details-page.popover.genesis-level")} {level}
            </h4>
            {canLevelUp && (
              <StatisticItem accent label={t("level-tooltip.level-up")}>
                {t("level-tooltip.top10")}
              </StatisticItem>
            )}

            <StatisticItem
              accent
              label={t("program-details-page.popover.invest-limit")}
            >
              <NumberFormat
                value={formatCurrencyValue(levelLimit, currency)}
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
              <Fragment>
                {t("program-details-page.popover.about-levels")} &#8250;
              </Fragment>
            </GVButton>
          </div>
        </div>
        <AboutLevelsComponent
          open={isOpenAboutLevels}
          onClose={this.handleCloseAboutLevels}
          currency={currency}
          investmentsLimits={investmentsLimits}
        />
      </Fragment>
    );
  }
}

export default translate()(InvestmentLimitsPopover);
