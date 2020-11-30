import FeeCommission from "components/fee-commission/fee-commission";
import styles from "components/fee-commission/fee-commission.module.scss";
import FeesTooltip from "components/fees-tooltip/fees-tooltip";
import { Row } from "components/row/row";
import { SignalSubscriber } from "gv-api-web";
import * as React from "react";
import { useTranslation } from "react-i18next";

interface Props {
  subscription: SignalSubscriber;
}

const SubscriptionsFeesTooltip: React.FC<Props> = ({
  subscription,
  children
}) => {
  const [t] = useTranslation();
  return (
    <FeesTooltip
      header={
        <>
          <FeeCommission
            className={styles["fee-commission--green-value"]}
            title={t("program-details-page:copytrading-tables.fees.SuccessFee")}
            value={subscription.totalSuccessFeeAmount}
            currency={subscription.totalSuccessFeeCurrency}
          />
          <Row size={"small"}>
            <FeeCommission
              className={styles["fee-commission--green-value"]}
              title={t(
                "program-details-page:copytrading-tables.fees.ManagerSignalMasterVolumeFee"
              )}
              value={subscription.totalVolumeFeeAmount}
              currency={subscription.totalVolumeFeeCurrency}
            />
          </Row>
        </>
      }
      footer={
        <FeeCommission
          className={styles["fee-commission--green-value"]}
          title={t("program-details-page:copytrading-tables.fees.total")}
          value={subscription.totalCommissionAmount}
          currency={subscription.totalCommissionCurrency}
        />
      }
    >
      {children}
    </FeesTooltip>
  );
};

export default SubscriptionsFeesTooltip;
