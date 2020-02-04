import FeeCommission from "components/fee-commission/fee-commission";
import FeesTooltip from "components/fees-tooltip/fees-tooltip";
import { OrderSignalModel } from "gv-api-web";
import * as React from "react";
import { useTranslation } from "react-i18next";

const _TradesHistoryFeesTooltip: React.FC<Props> = ({
  trade: {
    totalCommissionByType,
    originalCommission,
    originalCommissionCurrency,
    totalCommission,
    currency
  },
  children
}) => {
  const [t] = useTranslation();
  return (
    <FeesTooltip
      header={
        <>
          <FeeCommission
            title={t(`copytrading-tables.fees.trading`)}
            value={originalCommission}
            currency={originalCommissionCurrency}
          />
          {totalCommissionByType.map((commission, index) => (
            <FeeCommission
              key={index}
              title={commission.title}
              value={commission.amount}
              currency={commission.currency}
            />
          ))}
        </>
      }
      footer={
        totalCommissionByType && totalCommissionByType.length > 0 ? (
          <FeeCommission
            title={t(`copytrading-tables.fees.total`)}
            value={totalCommission}
            currency={currency}
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
