import { LabeledValue } from "components/labeled-value/labeled-value";
import { Row } from "components/row/row";
import { Text } from "components/text/text";
import withLoader from "decorators/with-loader";
import {
  getMarginRatioColor,
  MARGIN_INFO_ASSET
} from "pages/trade/binance-trade-page/trading/margin-ratio/margin-ratio.helpers";
import React from "react";
import { useTranslation } from "react-i18next";

interface Props {
  maintMargin: number;
  marginBalance: number;
}

const _MarginRatio: React.FC<Props> = ({ maintMargin, marginBalance }) => {
  const [t] = useTranslation();
  const marginRatio =
    +marginBalance > 0 ? (+maintMargin / +marginBalance) * 100 : 0;
  return (
    <>
      <Row>
        <LabeledValue direction={"row"} label={t("Margin ratio")}>
          <Text wrap={false} color={getMarginRatioColor(+marginRatio)}>
            <h4>{marginRatio.toFixed(2)} %</h4>
          </Text>
        </LabeledValue>
      </Row>
      <Row onlyOffset>
        <LabeledValue direction={"row"} label={t("Margin balance")}>
          <Text size={"small"}>
            {(+marginBalance).toFixed(2)} {MARGIN_INFO_ASSET}
          </Text>
        </LabeledValue>
      </Row>
      <Row>
        <LabeledValue direction={"row"} label={t("Maintenance margin")}>
          <Text size={"small"}>
            {(+maintMargin).toFixed(2)} {MARGIN_INFO_ASSET}
          </Text>
        </LabeledValue>
      </Row>
    </>
  );
};

export const MarginRatio = withLoader(React.memo(_MarginRatio));
