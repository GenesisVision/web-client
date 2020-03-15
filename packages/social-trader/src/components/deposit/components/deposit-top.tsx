import { DialogTop } from "components/dialog/dialog-top";
import { Row } from "components/row/row";
import StatisticItem from "components/statistic-item/statistic-item";
import { ASSET } from "constants/constants";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { formatCurrencyValue } from "utils/formatter";
import { CurrencyEnum } from "utils/types";

const _DepositTop: React.FC<DepositTopOwnProps> = ({
  ownAsset,
  header,
  asset,
  title,
  currency,
  availableToInvest
}) => {
  const [t] = useTranslation();
  return (
    <DialogTop
      title={header || t("deposit-asset.title")}
      subtitle={title || asset}
    >
      {asset === ASSET.PROGRAM && !ownAsset && !!availableToInvest && (
        <Row large>
          <StatisticItem
            label={t("deposit-asset.program.available-to-invest")}
            big
          >
            {`${formatCurrencyValue(availableToInvest, currency!)} ${currency}`}
          </StatisticItem>
        </Row>
      )}
    </DialogTop>
  );
};

export interface DepositTopOwnProps {
  ownAsset?: boolean;
  currency?: CurrencyEnum;
  title?: string;
  availableToInvest?: number;
  asset: ASSET;
  header?: string;
}

const DepositTop = React.memo(_DepositTop);
export default DepositTop;
