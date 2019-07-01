import "./program-subscrition-fees-tooltip.scss";

import { SignalSubscriber } from "gv-api-web";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import FeeCommission from "shared/components/fee-commission/fee-commission";
import { HORIZONTAL_POPOVER_POS } from "shared/components/popover/popover";
import Tooltip from "shared/components/tooltip/tooltip";
import { formatValue } from "shared/utils/formatter";

const _FeesTooltip: React.FC<Props> = ({ t, subscription, children }) => {
  return (
    <Tooltip
      horizontal={HORIZONTAL_POPOVER_POS.RIGHT}
      className={"subscription-fees-tooltip"}
      render={() => (
        <>
          <div className="subscription-fees-tooltip__header">
            <FeeCommission
              title={t(`investor.copytrading-tables.fees.SuccessFee`)}
              value={formatValue(subscription.totalSuccessFeeAmount, 8)}
              currency={subscription.totalSuccessFeeCurrency}
            />
            <FeeCommission
              title={t(
                `investor.copytrading-tables.fees.ManagerSignalMasterVolumeFee`
              )}
              value={formatValue(subscription.totalVolumeFeeAmount, 8)}
              currency={subscription.totalVolumeFeeCurrency}
            />
          </div>
          <div className={"subscription-fees-tooltip__footer "}>
            <FeeCommission
              title={t(`investor.copytrading-tables.fees.total`)}
              value={formatValue(subscription.totalCommissionAmount, 8)}
              currency={subscription.totalCommissionCurrency}
            />
          </div>
        </>
      )}
    >
      <span>{children}</span>
    </Tooltip>
  );
};

const FeesTooltip = translate()(_FeesTooltip);

export default FeesTooltip;

interface Props extends InjectedTranslateProps {
  subscription: SignalSubscriber;
}
