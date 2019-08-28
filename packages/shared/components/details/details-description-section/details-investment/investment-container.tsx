import "./details-investment.scss";

import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { IFundWithdrawalContainerProps } from "shared/components/funds/fund-details/fund-details.types";
import SubscriptionDetailsContainer from "shared/components/programs/program-details/program-details-description/subscription-details/subscription-details-container";
import { IProgramReinvestingContainerOwnProps } from "shared/components/programs/program-details/program-details.types";
import { STATUS } from "shared/constants/constants";
import { CurrencyEnum } from "shared/utils/types";

import { InvestmentDetails } from "./details-investment.helpers";
import Investment from "./investment";

const _InvestmentContainer: React.FC<Props> = ({
  updateDescription,
  t,
  id,
  assetCurrency,
  accountCurrency,
  asset,
  notice,
  personalDetails,
  WithdrawContainer,
  ProgramReinvestingWidget
}) => {
  return (
    <div className="details-investment__investment-container">
      {hasActiveInvestment(personalDetails) && (
        <Investment
          updateDescription={updateDescription}
          id={id}
          assetCurrency={assetCurrency}
          accountCurrency={accountCurrency}
          asset={asset}
          notice={notice}
          personalDetails={personalDetails}
          WithdrawContainer={WithdrawContainer}
          ProgramReinvestingWidget={ProgramReinvestingWidget}
        />
      )}
      {hasSubscription(personalDetails) && (
        <SubscriptionDetailsContainer
          id={id}
          currency={assetCurrency}
          personalDetails={personalDetails}
        />
      )}
    </div>
  );
};

interface OwnProps {
  updateDescription: () => void;
  asset: string;
  notice?: string;
  id: string;
  accountCurrency: CurrencyEnum;
  assetCurrency: CurrencyEnum;
  personalDetails: InvestmentDetails;
  WithdrawContainer: React.ComponentType<IFundWithdrawalContainerProps>;
  ProgramReinvestingWidget?: React.ComponentType<
    IProgramReinvestingContainerOwnProps
  >;
}

export const hasActiveInvestment = (details: InvestmentDetails): boolean =>
  details && details.isInvested && details.status !== STATUS.ENDED;

export const hasSubscription = (details: InvestmentDetails): boolean =>
  details &&
  details.signalSubscription &&
  details.signalSubscription.hasActiveSubscription;

interface Props extends OwnProps, WithTranslation {}

const InvestmentContainer = translate()(React.memo(_InvestmentContainer));
export default InvestmentContainer;
