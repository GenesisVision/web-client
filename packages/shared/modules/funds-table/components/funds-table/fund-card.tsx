import { FundDetails } from "gv-api-web";
import { GVButton } from "gv-react-components";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";
import AssetAvatar from "shared/components/avatar/asset-avatar/asset-avatar";
import FundAssetContainer from "shared/components/fund-asset/fund-asset-container";
import { ActionsCircleIcon } from "shared/components/icon/actions-circle-icon";
import Popover, {
  HORIZONTAL_POPOVER_POS,
  VERTICAL_POPOVER_POS
} from "shared/components/popover/popover";
import Profitability from "shared/components/profitability/profitability";
import {
  PROFITABILITY_PREFIX,
  PROFITABILITY_VARIANT
} from "shared/components/profitability/profitability.helper";
import ProgramSimpleChart from "shared/components/program-simple-chart/program-simple-chart";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import {
  composeFundsDetailsUrl,
  composeManagerDetailsUrl
} from "shared/utils/compose-url";
import {
  formatValue,
  formatValueDifferentDecimalScale
} from "shared/utils/formatter";
import { Nullable } from "shared/utils/types";

import { FUND_ASSET_TYPE } from "../../../../components/fund-asset/fund-asset";

const DECIMAL_SCALE_SMALL_VALUE = 4;
const DECIMAL_SCALE_BIG_VALUE = 2;

interface IFundCardProps {
  fund: FundDetails;
  toggleFavorite(programId: string, isFavorite: boolean): void;
  title: string;
}

interface IFundCardState {
  anchor: Nullable<EventTarget>;
}

class FundCard extends React.Component<
  IFundCardProps & InjectedTranslateProps,
  IFundCardState
> {
  state = {
    anchor: null
  };
  handleOpenDropdown = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ): void => this.setState({ anchor: event.currentTarget });
  handleCloseDropdown = () => this.setState({ anchor: null });
  render() {
    const { t, fund, toggleFavorite, title } = this.props;
    const handleToggleFavorite = () => {
      toggleFavorite(fund.id, fund.personalDetails.isFavorite);
    };
    return (
      <div className="table-cards__card">
        <div className="table-cards__row">
          <div className="table-cards__avatar">
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
          <div className="table-cards__main-info">
            <div className="table-cards__title-wrapper">
              <Link
                className="table-cards__title"
                to={{
                  pathname: composeFundsDetailsUrl(fund.url),
                  state: `/ ${title}`
                }}
              >
                {fund.title}
              </Link>
              <Link
                className="table-cards__name"
                to={{
                  pathname: composeManagerDetailsUrl(fund.manager.url),
                  state: `/ ${title}`
                }}
              >
                {fund.manager.username}
              </Link>
            </div>
            <div className="table-cards__actions">
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
                      {t("fund-actions.details")}
                    </GVButton>
                  </Link>
                  {fund.personalDetails && !fund.personalDetails.isFavorite && (
                    <GVButton
                      variant="text"
                      color="secondary"
                      onClick={handleToggleFavorite}
                    >
                      {t("fund-actions.add-to-favorites")}
                    </GVButton>
                  )}
                  {fund.personalDetails && fund.personalDetails.isFavorite && (
                    <GVButton
                      variant="text"
                      color="secondary"
                      onClick={handleToggleFavorite}
                    >
                      {t("fund-actions.remove-from-favorites")}
                    </GVButton>
                  )}
                </div>
              </Popover>
            </div>
          </div>
        </div>
        <div className="table-cards__row">
          <div className="table-cards__chart">
            <ProgramSimpleChart data={fund.chart} programId={fund.id} />
          </div>
          <div className="table-cards__chart-info">
            <div className="table-cards__profit">
              <Profitability
                value={formatValue(fund.statistic.profitPercent, 2)}
                variant={PROFITABILITY_VARIANT.CHIPS}
                prefix={PROFITABILITY_PREFIX.ARROW}
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
        <div className="table-cards__table table-cards__table--flex-wrap">
          <div className="table-cards__table-column">
            <StatisticItem label={t("funds-page.funds-header.balance")}>
              <NumberFormat
                value={formatValueDifferentDecimalScale(
                  fund.statistic.balanceGVT.amount,
                  DECIMAL_SCALE_SMALL_VALUE,
                  DECIMAL_SCALE_BIG_VALUE
                )}
                suffix=" GVT"
                displayType="text"
              />
            </StatisticItem>
          </div>
          <div className="table-cards__table-column">
            <StatisticItem label={t("funds-page.funds-header.investors")}>
              <NumberFormat
                value={fund.statistic.investorsCount}
                displayType="text"
                decimalScale={0}
              />
            </StatisticItem>
          </div>
          <div className="table-cards__table-column">
            <StatisticItem label={t("funds-page.funds-header.drawdown")}>
              <NumberFormat
                value={formatValue(fund.statistic.drawdownPercent, 2)}
                displayType="text"
                suffix="%"
              />
            </StatisticItem>
          </div>
          <div className="table-cards__table-row">
            <FundAssetContainer
              assets={fund.topFundAssets}
              type={FUND_ASSET_TYPE.SHORT}
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
