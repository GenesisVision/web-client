import "./details-investment.scss";

import AssetStatus from "components/asset-status/asset-status";
import GVButton from "components/gv-button";
import Profitability from "components/profitability/profitability";
import {
  PROFITABILITY_PREFIX,
  PROFITABILITY_VARIANT
} from "components/profitability/profitability.helper";
import { StatisticItemList } from "components/statistic-item-list/statistic-item-list";
import StatisticItem from "components/statistic-item/statistic-item";
import { TooltipLabel } from "components/tooltip-label/tooltip-label";
import useIsOpen from "hooks/is-open.hook";
import { IFundWithdrawalContainerProps } from "pages/funds/fund-details/fund-details.types";
import React from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import { useSelector } from "react-redux";
import { currencySelector } from "reducers/account-settings-reducer";
import { PROGRAM, STATUS } from "shared/constants/constants";
import { formatCurrencyValue, roundPercents } from "utils/formatter";
import { CurrencyEnum, FeesType } from "utils/types";

import { InvestmentDetails } from "./details-investment.helpers";

const _Investment: React.FC<Props> = ({
  fees,
  updateDescription,
  id,
  assetCurrency,
  asset,
  notice,
  personalDetails,
  WithdrawContainer,
  ReinvestingWidget
}) => {
  const {
    successFeePersonal,
    successFeeCurrent,
    exitFee,
    exitFeePersonal,
    entryFeeCurrent
  } = fees;
  const accountCurrency = useSelector(currencySelector);
  const [t] = useTranslation();
  const [isOpenPopup, setOpenPopup, setClosePopup] = useIsOpen();
  const profitValue = personalDetails.value - 0; // personalDetails.invested
  return (
    <div className="details-investment__block details-investment__block--investment">
      <div className="details-investment__heading">
        <h5>{t("program-details-page.description.investment-details")}</h5>
      </div>
      <div className="details-investment__current-period-investment-data">
        <StatisticItemList className="details-investment__short-statistic">
          <StatisticItem
            accent
            label={t("fund-details-page.description.value")}
          >
            <NumberFormat
              value={formatCurrencyValue(personalDetails.value, assetCurrency)}
              suffix={` ${assetCurrency}`}
              displayType="text"
            />
          </StatisticItem>
          <StatisticItem
            condition={asset === PROGRAM}
            accent
            label={
              <TooltipLabel
                tooltipContent={t("program-details-page.tooltip.profit")}
                labelText={t("fund-details-page.description.profit")}
              />
            }
          >
            <Profitability
              value={formatCurrencyValue(profitValue, assetCurrency)}
              prefix={PROFITABILITY_PREFIX.SIGN}
            >
              <NumberFormat
                value={formatCurrencyValue(profitValue, assetCurrency)}
                suffix={` ${assetCurrency}`}
                allowNegative={false}
                displayType="text"
              />
            </Profitability>
            <Profitability
              value={`${0}`} // personalDetails.profit
              variant={PROFITABILITY_VARIANT.CHIPS}
            >
              {roundPercents(0)} // personalDetails.profit
            </Profitability>
          </StatisticItem>
          <StatisticItem
            condition={
              false && // personalDetails.invested !== 0
              successFeePersonal !== undefined &&
              successFeePersonal !== null
            }
            label={t("program-details-page.description.successFee")}
            accent
          >
            <NumberFormat
              value={successFeePersonal}
              suffix={` %`}
              allowNegative={false}
              displayType="text"
            />
          </StatisticItem>
          <StatisticItem
            condition={
              exitFeePersonal !== null &&
              exitFeePersonal !== undefined &&
              exitFee !== exitFeePersonal
            }
            label={t("fund-details-page.description.exitFee")}
            accent
          >
            <NumberFormat
              value={exitFeePersonal}
              suffix={` %`}
              allowNegative={false}
              displayType="text"
            />
          </StatisticItem>
          <StatisticItem
            accent
            label={
              <TooltipLabel
                tooltipContent={t(`fund-details-page.tooltip.status.${asset}`)}
                labelText={t("fund-details-page.description.status")}
              />
            }
          >
            <AssetStatus
              successFee={successFeeCurrent}
              exitFee={exitFee !== exitFeePersonal}
              entryFee={entryFeeCurrent}
              status={personalDetails.status as STATUS}
              id={id}
              asset={asset}
              onCancel={updateDescription}
            />
          </StatisticItem>
          <StatisticItem
            condition={
              personalDetails.pendingInput !== undefined &&
              personalDetails.pendingInput !== 0
            }
            accent
            label={t("fund-details-page.description.pending-input")}
          >
            <NumberFormat
              value={formatCurrencyValue(
                personalDetails.pendingInput,
                assetCurrency
              )}
              suffix={` ${assetCurrency}`}
              displayType="text"
            />
          </StatisticItem>
          {ReinvestingWidget &&
            personalDetails.isInvested &&
            personalDetails.canInvest && (
              <ReinvestingWidget
                programId={id}
                isReinvesting={false} // personalDetails.isReinvest
              />
            )}
          <StatisticItem
            condition={
              personalDetails.pendingOutput !== undefined &&
              personalDetails.pendingOutput !== 0
            }
            accent
            label={t("fund-details-page.description.pending-output")}
          >
            {false ? ( // personalDetails.pendingOutputIsWithdrawAll
              t("withdraw-program.withdrawing-all")
            ) : (
              <NumberFormat
                value={formatCurrencyValue(
                  personalDetails.pendingOutput,
                  assetCurrency
                )}
                suffix={` ${assetCurrency}`}
                displayType="text"
              />
            )}
          </StatisticItem>
        </StatisticItemList>
        <div className="details-investment__footer">
          <GVButton
            color="secondary"
            variant="outlined"
            onClick={setOpenPopup}
            disabled={!personalDetails.canWithdraw}
          >
            {t("fund-details-page.description.withdraw")}
          </GVButton>
          {notice && (
            <p className="details-investment__withdraw-notice">{notice}</p>
          )}
          {WithdrawContainer && (
            <WithdrawContainer
              open={isOpenPopup}
              id={id}
              accountCurrency={accountCurrency}
              assetCurrency={assetCurrency}
              onClose={setClosePopup}
              onSubmit={updateDescription}
            />
          )}
        </div>
      </div>
    </div>
  );
};

interface Props {
  fees: FeesType;
  updateDescription: () => void;
  asset: string;
  notice?: string;
  id: string;
  assetCurrency: CurrencyEnum;
  personalDetails: InvestmentDetails;
  WithdrawContainer?: React.ComponentType<IFundWithdrawalContainerProps>;
  ReinvestingWidget?: React.ComponentType<any>;
}

const Investment = React.memo(_Investment);
export default Investment;
