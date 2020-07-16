import { Center } from "components/center/center";
import { RowItem } from "components/row-item/row-item";
import { Text } from "components/text/text";
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
      <RowItem size={"small"}>{name}</RowItem>
      <Text muted>{currency}</Text>
    </Center>
  </TooltipContent>
);

const FundAssetTooltip = React.memo(_FundAssetTooltip);
export default FundAssetTooltip;
