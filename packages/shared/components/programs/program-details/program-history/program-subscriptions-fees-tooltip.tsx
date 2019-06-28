import "./program-subscrition-fees-tooltip.scss";

import { SignalSubscriber } from "gv-api-web";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import FeeCommission from "shared/components/fee-commission/fee-commission";
import { HORIZONTAL_POPOVER_POS } from "shared/components/popover/popover";
import Tooltip from "shared/components/tooltip/tooltip";
import { formatCurrencyValue } from "shared/utils/formatter";

const _FeesTooltip: React.FC<Props> = ({ t, subscription, children }) => {
  return (
    <Tooltip
      horizontal={HORIZONTAL_POPOVER_POS.RIGHT}
      className={"fees-tooltip subscription-fees"}
      render={() => (
        <div className="profile-menu">
          <div className="profile-menu__header">
            <FeeCommission
              title={t(`investor.copytrading-tables.fees.SuccessFee`)}
              value={formatCurrencyValue(
                subscription.totalSuccessFeeAmount,
                subscription.totalSuccessFeeCurrency
              )}
              currency={subscription.totalSuccessFeeCurrency}
            />
            <FeeCommission
              title={t(
                `investor.copytrading-tables.fees.ManagerSignalMasterVolumeFee`
              )}
              value={formatCurrencyValue(
                subscription.totalVolumeFeeAmount,
                subscription.totalVolumeFeeCurrency
              )}
              currency={subscription.totalVolumeFeeCurrency}
            />
          </div>
          <div className={"fees-tooltip__footer "}>
            <FeeCommission
              title={t(`investor.copytrading-tables.fees.total`)}
              value={formatCurrencyValue(
                subscription.totalCommissionAmount,
                subscription.totalCommissionCurrency
              )}
              currency={subscription.totalCommissionCurrency}
            />
          </div>
        </div>
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
