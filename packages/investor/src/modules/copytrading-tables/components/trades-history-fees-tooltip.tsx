import { OrderSignalModel } from "gv-api-web";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { compose } from "redux";
import FeeCommission from "shared/components/fee-commission/fee-commission";
import FeesTooltip from "shared/components/fees-tooltip/fees-tooltip";

const _TradesHistoryFeesTooltip: React.FC<Props> = ({ trade, t, children }) => (
  <FeesTooltip
    header={
      <>
        <FeeCommission
          title={t(`investor.copytrading-tables.fees.trading`)}
          value={trade.originalCommission}
          currency={trade.originalCommissionCurrency}
        />
        {trade.totalCommissionByType.map((commission, index) => (
          <FeeCommission
            key={index}
            title={t(`investor.copytrading-tables.fees.${commission.type}`)}
            value={commission.amount}
            currency={commission.currency}
          />
        ))}
      </>
    }
    footer={
      trade.totalCommissionByType.length > 0 ? (
        <FeeCommission
          title={t(`investor.copytrading-tables.fees.total`)}
          value={trade.totalCommission}
          currency={trade.currency}
        />
      ) : (
        undefined
      )
    }
  >
    {children}
  </FeesTooltip>
);

const TradesHistoryFeesTooltip = compose<React.FC<OwnProps>>(
  translate(),
  React.memo
)(_TradesHistoryFeesTooltip);

export default TradesHistoryFeesTooltip;

interface Props extends InjectedTranslateProps, OwnProps {}

interface OwnProps {
  trade: OrderSignalModel;
}
