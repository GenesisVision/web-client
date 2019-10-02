import "./details-investment.scss";

import React from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import { useSelector } from "react-redux";
import AssetStatus from "shared/components/asset-status/asset-status";
import { IFundWithdrawalContainerProps } from "shared/components/funds/fund-details/fund-details.types";
import GVButton from "shared/components/gv-button";
import Profitability from "shared/components/profitability/profitability";
import { PROFITABILITY_PREFIX, PROFITABILITY_VARIANT } from "shared/components/profitability/profitability.helper";
import { IProgramReinvestingContainerOwnProps } from "shared/components/programs/program-details/program-details.types";
import { StatisticItemList } from "shared/components/statistic-item-list/statistic-item-list";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { TooltipLabel } from "shared/components/tooltip-label/tooltip-label";
import { PROGRAM, ROLE, STATUS } from "shared/constants/constants";
import useIsOpen from "shared/hooks/is-open.hook";
import useRole from "shared/hooks/use-role.hook";
import { currencySelector } from "shared/reducers/account-settings-reducer";
import { formatCurrencyValue, roundPercents } from "shared/utils/formatter";
import { CurrencyEnum, FeesType } from "shared/utils/types";

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
  ProgramReinvestingWidget
}) => {
  const role = useRole();
  const isInvestor = role === ROLE.INVESTOR;
  const {
    successFeePersonal,
    successFeeCurrent,
    exitFee,
    exitFeePersonal,
    entryFeeCurrent,
    entryFeeSelected
  } = fees;
  const accountCurrency = useSelector(currencySelector);
  const [t] = useTranslation();
  const [isOpenPopup, setOpenPopup, setClosePopup] = useIsOpen();
  const profitValue = personalDetails.value - personalDetails.invested;
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
              value={`${personalDetails.profit}`}
              variant={PROFITABILITY_VARIANT.CHIPS}
            >
              {roundPercents(personalDetails.profit)}
            </Profitability>
          </StatisticItem>
          <StatisticItem
            condition={
              isInvestor &&
              personalDetails.invested !== 0 &&
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
              isInvestor &&
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
          {ProgramReinvestingWidget &&
            personalDetails.isInvested &&
            personalDetails.canInvest && (
              <ProgramReinvestingWidget
                programId={id}
                isReinvesting={personalDetails.isReinvest}
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
            {personalDetails.pendingOutputIsWithdrawAll ? (
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
          <WithdrawContainer
            open={isOpenPopup}
            id={id}
            accountCurrency={accountCurrency}
            assetCurrency={assetCurrency}
            onClose={setClosePopup}
            onSubmit={updateDescription}
          />
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
  WithdrawContainer: React.ComponentType<IFundWithdrawalContainerProps>;
  ProgramReinvestingWidget?: React.ComponentType<
    IProgramReinvestingContainerOwnProps
  >;
}

const Investment = React.memo(_Investment);
export default Investment;
