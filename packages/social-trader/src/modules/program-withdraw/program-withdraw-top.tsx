import { DialogTop } from "components/dialog/dialog-top";
import { LabeledValue } from "components/labeled-value/labeled-value";
import { Row } from "components/row/row";
import { Text } from "components/text/text";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { formatCurrencyValue } from "utils/formatter";
import { CurrencyEnum } from "utils/types";

const _ProgramWithdrawTop: React.FC<OwnProps> = ({
  availableToWithdraw,
  title,
  programCurrency
}) => {
  const [t] = useTranslation();
  return (
    <DialogTop title={t("withdraw-program.title")} subtitle={title}>
      <Row size={"large"}>
        <LabeledValue label={t("withdraw-program.available-to-withdraw")}>
          <Text size={"xlarge"}>
            {formatCurrencyValue(availableToWithdraw, programCurrency)}{" "}
            {programCurrency}
          </Text>
        </LabeledValue>
      </Row>
    </DialogTop>
  );
};

const ProgramWithdrawTop = React.memo(_ProgramWithdrawTop);
export default ProgramWithdrawTop;

interface OwnProps {
  rate: number;
  availableToWithdraw: number;
  programCurrency: CurrencyEnum;
  accountCurrency: CurrencyEnum;
  title: string;
}
