import { ColoredText } from "components/colored-text/colored-text";
import { DefaultBlock } from "components/default.block/default.block";
import { MutedText } from "components/muted-text/muted-text";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import StatisticItemInner from "components/statistic-item/statistic-item-inner";
import { SIZES } from "constants/constants";
import { FuturesAsset } from "pages/trades/binance-trade-page/services/futures/binance-futures.types";
import {
  getMarginRatioColor,
  MARGIN_INFO_ASSET
} from "pages/trades/binance-trade-page/trading/margin-ratio/margin-ratio.helpers";
import React from "react";
import { useTranslation } from "react-i18next";

import styles from "./margin-ratio.module.scss";

interface Props {
  marginInfo: FuturesAsset;
}

const MarginRatioItem: React.FC<{
  label: string;
  value: JSX.Element;
}> = React.memo(({ label, value }) => {
  return (
    <Row wide>
      <RowItem wide>
        <MutedText>{label}</MutedText>
      </RowItem>
      <RowItem className={styles["margin-ratio__value"]}>{value}</RowItem>
    </Row>
  );
});

const _MarginRatio: React.FC<Props> = ({
  marginInfo: { maintMargin, marginBalance }
}) => {
  const [t] = useTranslation();
  const marginRatio =
    +marginBalance > 0 ? (+maintMargin / +marginBalance) * 100 : 0;
  return (
    <DefaultBlock size={SIZES.SMALL} roundedBorder={false} bordered>
      <Row>
        <StatisticItemInner big accent label={t("Margin ratio")}>
          <ColoredText color={getMarginRatioColor(+marginRatio)}>
            {marginRatio.toFixed(2)} %
          </ColoredText>
        </StatisticItemInner>
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

export const MarginRatio = React.memo(_MarginRatio);
