import { FundDetails } from "gv-api-web";
import { GVButton } from "gv-react-components";
import React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";
import AssetAvatar from "shared/components/avatar/asset-avatar/asset-avatar";
import { ActionsCircleIcon } from "shared/components/icon/actions-circle-icon";
import Popover, {
  HORIZONTAL_POPOVER_POS,
  VERTICAL_POPOVER_POS
} from "shared/components/popover/popover";
import Profitability from "shared/components/profitability/profitability";
import ProgramSimpleChart from "shared/components/program-simple-chart/program-simple-chart";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { composeManagerDetailsUrl } from "shared/utils/compose-url";
import { composeFundsDetailsUrl } from "shared/utils/compose-url";
import { formatValue } from "shared/utils/formatter";
import { Nullable } from "shared/utils/types";

import FundAssetContainer from "../../../../components/fund-asset/fund-asset-container";

interface IProgramCardProps {
  fund: FundDetails;
  toggleFavorite(programId: string, isFavorite: boolean): void;
  title: string;
}

interface IProgramCardState {
  anchor: Nullable<EventTarget>;
}

class FundCard extends React.Component<
  IProgramCardProps & InjectedTranslateProps,
  IProgramCardState
> {
  state = {
    anchor: null,
  };
  handleOpenDropdown = (event: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({ anchor: event.currentTarget });
  handleCloseDropdown = () => this.setState({ anchor: null });
  render() {
    const { t, fund, toggleFavorite, title } = this.props;
    const handleToggleFavorite = () => {
      toggleFavorite(fund.id, fund.personalDetails.isFavorite);
    };
    return (
      <div className="programs-cards__card">
        <div className="programs-cards__row">
          <div className="programs-cards__avatar">
            <Link
              to={{
                pathname: composeFundsDetailsUrl(fund.url),
                state: `/ ${title}`
              }}
            >
              <AssetAvatar
                url={fund.logo}
                alt={fund.title}
                color={fund.color}
                size="medium"
              />
            </Link>
          </div>
          <div className="programs-cards__main-info">
            <div className="programs-cards__title-wrapper">
              <Link
                className="programs-cards__title"
                to={{
                  pathname: composeFundsDetailsUrl(fund.url),
                  state: `/ ${title}`
                }}
              >
                {fund.title}
              </Link>
              <Link
                className="programs-cards__name"
                to={{
                  pathname: composeManagerDetailsUrl(fund.manager.url),
                  state: `/ ${title}`
                }}
              >
                {fund.manager.username}
              </Link>
            </div>
            <div className="programs-cards__actions">
              <ActionsCircleIcon
                primary={!!this.state.anchor}
                onClick={this.handleOpenDropdown}
              />
              <Popover
                horizontal={HORIZONTAL_POPOVER_POS.RIGHT}
                vertical={VERTICAL_POPOVER_POS.BOTTOM}
                anchorEl={this.state.anchor}
                noPadding
                onClose={this.handleCloseDropdown}
              >
                <div className="popover-list">
                  <Link
                    to={{
                      pathname: composeFundsDetailsUrl(fund.url),
                      state: `/ ${title}`
                    }}
                  >
                    <GVButton
                      variant="text"
                      color="secondary"
                      onClick={this.handleCloseDropdown}
                    >
                      {t("program-actions.details")}
                    </GVButton>
                  </Link>
                  {fund.personalDetails &&
                    !fund.personalDetails.isFavorite && (
                      <GVButton
                        variant="text"
                        color="secondary"
                        onClick={handleToggleFavorite}
                      >
                        {t("program-actions.add-to-favorites")}
                      </GVButton>
                    )}
                  {fund.personalDetails &&
                    fund.personalDetails.isFavorite && (
                      <GVButton
                        variant="text"
                        color="secondary"
                        onClick={handleToggleFavorite}
                      >
                        {t("program-actions.remove-from-favorites")}
                      </GVButton>
                    )}
                </div>
              </Popover>
            </div>
          </div>
        </div>
        <div className="programs-cards__row">
          <div className="programs-cards__chart">
            <ProgramSimpleChart data={fund.chart} programId={fund.id} />
          </div>
          <div className="programs-cards__chart-info">
            <div className="programs-cards__profit">
              <Profitability
                value={formatValue(fund.statistic.profitPercent, 2)}
                variant="chips"
                prefix="arrow"
              >
                <NumberFormat
                  value={formatValue(fund.statistic.profitPercent, 2)}
                  suffix="%"
                  allowNegative={false}
                  displayType="text"
                />
              </Profitability>
            </div>
          </div>
        </div>
        <div className="programs-cards__table">
          <div className="programs-cards__table-column">
            <StatisticItem label={t("programs-page.programs-header.equity")}>
              <NumberFormat
                value={formatValue(fund.statistic.balanceGVT.amount)}
                suffix=" GVT"
                decimalScale={0}
                displayType="text"
              />
            </StatisticItem>
          </div>
          <div className="programs-cards__table-column">
            <StatisticItem label={t("programs-page.programs-header.investors")}>
              <NumberFormat
                value={fund.statistic.investorsCount}
                displayType="text"
                decimalScale={0}
              />
            </StatisticItem>
          </div>
          <div className="programs-cards__table-column">
            <StatisticItem label={t("programs-page.programs-header.drawdown")}>
              <NumberFormat
                value={formatValue(fund.statistic.drawdownPercent, 2)}
                displayType="text"
                suffix="%"
              />
            </StatisticItem>
          </div>
          <div className="programs-cards__table-row">
            <FundAssetContainer
              assets={fund.topFundAssets}
              type={"short"}
              size={3}
              length={fund.totalAssetsCount}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default translate()(FundCard);
