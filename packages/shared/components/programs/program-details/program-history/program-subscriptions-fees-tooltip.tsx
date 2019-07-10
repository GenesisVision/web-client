import { SignalSubscriber } from "gv-api-web";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import FeeCommission from "shared/components/fee-commission/fee-commission";
import FeesTooltip from "shared/components/fees-tooltip/fees-tooltip";

const _SubscriptionsFeesTooltip: React.FC<Props> = ({
  t,
  subscription,
  children
}) => (
  <FeesTooltip
    header={
      <>
        <FeeCommission
          className="fee-commission--green-value"
          title={t(`investor.copytrading-tables.fees.SuccessFee`)}
          value={subscription.totalSuccessFeeAmount}
          currency={subscription.totalSuccessFeeCurrency}
        />
        <FeeCommission
          className="fee-commission--green-value"
          title={t(
            `investor.copytrading-tables.fees.ManagerSignalMasterVolumeFee`
          )}
          value={subscription.totalVolumeFeeAmount}
          currency={subscription.totalVolumeFeeCurrency}
        />
      </>
    }
    footer={
      <FeeCommission
        className="fee-commission--green-value"
        title={t(`investor.copytrading-tables.fees.total`)}
        value={subscription.totalCommissionAmount}
        currency={subscription.totalCommissionCurrency}
      />
    }
  >
    {children}
  </FeesTooltip>
);

const SubscriptionsFeesTooltip = translate()(_SubscriptionsFeesTooltip);

export default SubscriptionsFeesTooltip;

interface Props extends WithTranslation {
  subscription: SignalSubscriber;
}
