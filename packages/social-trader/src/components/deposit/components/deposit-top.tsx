import { DialogTop } from "components/dialog/dialog-top";
import { LabeledValue } from "components/labeled-value/labeled-value";
import { Row } from "components/row/row";
import { Text } from "components/text/text";
import { ASSET } from "constants/constants";
import * as React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { formatCurrencyValue } from "utils/formatter";
import {
  adaptivePadding,
  fontSize,
  horizontalPaddings,
  verticalPaddings
} from "utils/style/mixins";
import {
  $fontSizeCommon,
  $paddingBig,
  $paddingMedium,
  $paddingSmall,
  $paddingUpperMedium
} from "utils/style/sizes";
import { CurrencyEnum } from "utils/types";

export interface DepositTopOwnProps {
  ownAsset?: boolean;
  currency?: CurrencyEnum;
  title?: string;
  availableToInvest?: number;
  asset: ASSET;
  header?: string;
}

const Container = styled(Row)`
  justify-content: space-between;
  background: #1f2a33;
  ${horizontalPaddings($paddingSmall)};
  ${adaptivePadding("bottom", $paddingMedium)};
  ${adaptivePadding("top", $paddingBig)};
`;

const Subtitle = styled(Row)`
  ${fontSize($fontSizeCommon)};
  font-weight: 400;
  letter-spacing: 0.4px;
  color: #e8eff3;
`;

const TitleBlock = styled.div`
  margin-right: 30px;
`;

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
    // <DialogTop title={header || title} subtitle={subtitle || asset}>
    <Container>
      <TitleBlock>
        {title && (
          <Row>
            <h2>{header || title}</h2>
          </Row>
        )}
        {subtitle && <Subtitle size={"small"}>{subtitle}</Subtitle>}
      </TitleBlock>
      {asset === ASSET.PROGRAM && !ownAsset && !!availableToInvest && (
        <div>
          <LabeledValue
            direction={"column-reverse"}
            label={t("deposit-asset.program.available-to-invest")}
          >
            <Text size={"xlarge"}>{`${formatCurrencyValue(
              availableToInvest,
              currency!
            )} ${currency}`}</Text>
          </LabeledValue>
        </div>
      )}
    </Container>
    // </DialogTop>
  );
};

const DepositTop = React.memo(_DepositTop);
export default DepositTop;
