import FeeCommission from "components/fee-commission/fee-commission";
import styles from "components/fee-commission/fee-commission.module.scss";
import FeesTooltip from "components/fees-tooltip/fees-tooltip";
import { Row } from "components/row/row";
import { SignalSubscriber } from "gv-api-web";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";

const _SubscriptionsFeesTooltip: React.FC<Props> = ({
  t,
  subscription,
  children
}) => (
  <FeesTooltip
    header={
      <>
        <FeeCommission
          className={styles["fee-commission--green-value"]}
          title={t(`copytrading-tables.fees.SuccessFee`)}
          value={subscription.totalSuccessFeeAmount}
          currency={subscription.totalSuccessFeeCurrency}
        />
        <Row small>
          <FeeCommission
            className={styles["fee-commission--green-value"]}
            title={t(`copytrading-tables.fees.ManagerSignalMasterVolumeFee`)}
            value={subscription.totalVolumeFeeAmount}
            currency={subscription.totalVolumeFeeCurrency}
          />
        </Row>
      </>
    }
    footer={
      <FeeCommission
        className={styles["fee-commission--green-value"]}
        title={t(`copytrading-tables.fees.total`)}
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
