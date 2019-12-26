import FeeCommission from "components/fee-commission/fee-commission";
import FeesTooltip from "components/fees-tooltip/fees-tooltip";
import { OrderSignalModel } from "gv-api-web";
import * as React from "react";
import { useTranslation } from "react-i18next";

const _TradesHistoryFeesTooltip: React.FC<Props> = ({ trade, children }) => {
  const [t] = useTranslation();
  return (
    <FeesTooltip
      header={
        <>
          <FeeCommission
            title={t(`copytrading-tables.fees.trading`)}
            value={trade.originalCommission}
            currency={trade.originalCommissionCurrency}
          />
          {trade.totalCommissionByType.map((commission, index) => (
            <FeeCommission
              key={index}
              title={t(`copytrading-tables.fees.${commission.type}`)}
              value={commission.amount}
              currency={commission.currency}
            />
          ))}
        </>
      }
      footer={
        trade.totalCommissionByType.length > 0 ? (
          <FeeCommission
            title={t(`copytrading-tables.fees.total`)}
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
};

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  trade: OrderSignalModel;
}

const TradesHistoryFeesTooltip = React.memo(_TradesHistoryFeesTooltip);
export default TradesHistoryFeesTooltip;
