import { LabeledValue } from "components/labeled-value/labeled-value";
import { Row } from "components/row/row";
import { Text } from "components/text/text";
import {
  getMarginRatioColor,
  MARGIN_INFO_ASSET
} from "pages/trade/binance-trade-page/trading/margin-ratio/margin-ratio.helpers";
import React from "react";
import { useTranslation } from "react-i18next";

interface Props {
  marginRatio: number;
  maintMargin: number;
  marginBalance: number;
}

const _MarginRatioView: React.FC<Props> = ({
  maintMargin,
  marginBalance,
  marginRatio
}) => {
  const [t] = useTranslation();
  return (
    <>
      <Row size={"small"}>
        <LabeledValue direction={"row"} label={t("Margin ratio")}>
          <Text wrap={false} color={getMarginRatioColor(+marginRatio)}>
            <h4>{marginRatio.toFixed(2)} %</h4>
          </Text>
        </LabeledValue>
      </Row>
      <Row size={"small"}>
        <LabeledValue direction={"row"} label={t("Maintenance margin")}>
          <Text size={"small"}>
            {(+maintMargin).toFixed(2)} {MARGIN_INFO_ASSET}
          </Text>
        </LabeledValue>
      </Row>
      <Row onlyOffset size={"small"}>
        <LabeledValue direction={"row"} label={t("Margin balance")}>
          <Text size={"small"}>
            {(+marginBalance).toFixed(2)} {MARGIN_INFO_ASSET}
          </Text>
        </LabeledValue>
      </Row>
    </>
  );
};

export const MarginRatioView = React.memo(_MarginRatioView);
