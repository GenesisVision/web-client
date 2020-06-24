import { DialogTop } from "components/dialog/dialog-top";
import { BlurableLabeledValue } from "components/labeled-value/blurable-labeled-value";
import { Row } from "components/row/row";
import { Text } from "components/text/text";
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
        <BlurableLabeledValue
          label={t("withdraw-fund.available-to-withdraw")}
          isPending={isPending}
        >
          <Text size={"xlarge"}>
            {formatCurrencyValue(availableToWithdraw, currency)} {currency}
          </Text>
        </BlurableLabeledValue>
      </Row>
    </DialogTop>
  );
};

export const FundWithdrawTop = React.memo(_FundWithdrawTop);
