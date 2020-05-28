import { Center } from "components/center/center";
import { MutedText } from "components/muted-text/muted-text";
import { RowItem } from "components/row-item/row-item";
import { TooltipContent } from "components/tooltip/tooltip-content";
import * as React from "react";
import { CurrencyEnum } from "utils/types";

interface IFundAssetTooltipProps {
  name: string;
  currency: CurrencyEnum;
}

const _FundAssetTooltip: React.FC<IFundAssetTooltipProps> = ({
  name,
  currency
}) => (
  <TooltipContent fixed={false}>
    <Center>
      <RowItem small>{name}</RowItem>
      <MutedText>{currency}</MutedText>
    </Center>
  </TooltipContent>
);

const FundAssetTooltip = React.memo(_FundAssetTooltip);
export default FundAssetTooltip;
