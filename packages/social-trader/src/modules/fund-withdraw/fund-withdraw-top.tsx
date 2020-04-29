import { DialogTop } from "components/dialog/dialog-top";
import { Row } from "components/row/row";
import StatisticItem from "components/statistic-item/statistic-item";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { formatCurrencyValue } from "utils/formatter";

interface IFundWithdrawTopProps {
  isPending: boolean;
  availableToWithdraw: number;
  currency: string;
  title: string;
}

const _FundWithdrawTop: React.FC<IFundWithdrawTopProps> = ({
  isPending,
  availableToWithdraw,
  title,
  currency
}) => {
  const [t] = useTranslation();
  return (
    <DialogTop title={t("withdraw-fund.title")} subtitle={title}>
      <Row large>
        <StatisticItem
          label={t("withdraw-fund.available-to-withdraw")}
          big
          isPending={isPending}
        >
          {formatCurrencyValue(availableToWithdraw, currency)} {currency}
        </StatisticItem>
      </Row>
    </DialogTop>
  );
};

export const FundWithdrawTop = React.memo(_FundWithdrawTop);
