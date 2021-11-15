import { Center } from "components/center/center";
import { DefaultBlock } from "components/default.block/default.block";
import HelpButton from "components/help-button/help-button";
import { HORIZONTAL_POPOVER_POS } from "components/popover/popover";
import { RowItem } from "components/row-item/row-item";
import { Text } from "components/text/text";
import { HelpContainer } from "components/text-with-question/text-with-question";
import React from "react";

export const MarketTotalLabel: React.FC = () => {
  return (
    <Center>
      <RowItem size={"small"}>Total</RowItem>
      <RowItem>
        <HelpContainer
          horizontal={HORIZONTAL_POPOVER_POS.RIGHT}
          tooltipContent={
            <DefaultBlock size={"small"}>
              <Text size={"small"} muted>
                {
                  "Place a market order based on the amount of assets you want to spend. The final executed quantity and price will depend on the actual transaction result"
                }
              </Text>
            </DefaultBlock>
          }
        >
          <HelpButton muted />
        </HelpContainer>
      </RowItem>
    </Center>
  );
};
