import { DialogTop } from "components/dialog/dialog-top";
import { LabeledValue } from "components/labeled-value/labeled-value";
import { Row } from "components/row/row";
import { Text } from "components/text/text";
import { ASSET } from "constants/constants";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { formatCurrencyValue } from "utils/formatter";
import { CurrencyEnum } from "utils/types";

export interface DepositTopOwnProps {
  ownAsset?: boolean;
  currency?: CurrencyEnum;
  title?: string;
  availableToInvest?: number;
  asset: ASSET;
  header?: string;
}

const _DepositTop: React.FC<DepositTopOwnProps> = ({
  ownAsset,
  header,
  asset,
  title: subtitle,
  currency,
  availableToInvest
}) => {
  const [t] = useTranslation();
  const title = ownAsset
    ? t("deposit-asset.own-title")
    : t("deposit-asset.title");
  return (
    <DialogTop title={header || title} subtitle={subtitle || asset}>
      {asset === ASSET.PROGRAM && !ownAsset && !!availableToInvest && (
        <Row size={"large"}>
          <LabeledValue label={t("deposit-asset.program.available-to-invest")}>
            <Text size={"xlarge"}>{`${formatCurrencyValue(
              availableToInvest,
              currency!
            )} ${currency}`}</Text>
          </LabeledValue>
        </Row>
      )}
    </DialogTop>
  );
};

const DepositTop = React.memo(_DepositTop);
export default DepositTop;
