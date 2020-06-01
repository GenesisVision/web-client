import { DefaultBlock } from "components/default.block/default.block";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { Text } from "components/text/text";
import { SIZES } from "constants/constants";
import { withBlurLoader } from "decorators/with-blur-loader";
import { FuturesAsset } from "pages/trades/binance-trade-page/services/futures/binance-futures.types";
import {
  getMarginRatioColor,
  MARGIN_INFO_ASSET
} from "pages/trades/binance-trade-page/trading/margin-ratio/margin-ratio.helpers";
import React from "react";
import { useTranslation } from "react-i18next";

import styles from "./margin-ratio.module.scss";

interface Props {
  data: FuturesAsset;
}

const MarginRatioItem: React.FC<{
  label: string;
  value: JSX.Element;
}> = React.memo(({ label, value }) => {
  return (
    <Row wide>
      <RowItem wide>
        <Text muted>{label}</Text>
      </RowItem>
      <RowItem className={styles["margin-ratio__value"]}>{value}</RowItem>
    </Row>
  );
});

const _MarginRatio: React.FC<Props> = ({
  data: { maintMargin, marginBalance }
}) => {
  const [t] = useTranslation();
  const marginRatio =
    +marginBalance > 0 ? (+maintMargin / +marginBalance) * 100 : 0;
  return (
    <DefaultBlock size={SIZES.SMALL} roundedBorder={false} bordered>
      <Row>
        <MarginRatioItem
          label={t("Margin ratio")}
          value={
            <Text wrap={false} color={getMarginRatioColor(+marginRatio)}>
              <h4>{marginRatio.toFixed(2)} %</h4>
            </Text>
          }
        />
      </Row>
      <Row onlyOffset>
        <MarginRatioItem
          label={t("Margin balance")}
          value={
            <>
              {(+maintMargin).toFixed(2)} {MARGIN_INFO_ASSET}
            </>
          }
        />
        <MarginRatioItem
          label={t("Maintenance margin")}
          value={
            <>
              {(+marginBalance).toFixed(2)} {MARGIN_INFO_ASSET}
            </>
          }
        />
      </Row>
    </DefaultBlock>
  );
};

export const MarginRatio = withBlurLoader(React.memo(_MarginRatio));
