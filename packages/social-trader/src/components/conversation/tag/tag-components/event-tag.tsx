import { Center } from "components/center/center";
import { getAssetTagTextColor } from "components/conversation/tag/tag-components/tag-components.helpers";
import PortfolioEventLogo from "components/dashboard/dashboard-portfolio-events/dashboard-portfolio-event-logo/dashboard-portfolio-event-logo";
import Profitability from "components/profitability/profitability";
import {
  PROFITABILITY_PREFIX,
  PROFITABILITY_VARIANT
} from "components/profitability/profitability.helper";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { Text } from "components/text/text";
import React from "react";

import { IEventTagProps } from "./tag-components.types";

const _EventTag: React.FC<IEventTagProps> = ({
  data: {
    assetDetails,
    event: { logoUrl, title, amount, currency, percent, changeState }
  }
}) => {
  const color = getAssetTagTextColor(changeState);
  return (
    <Row wrap>
      <RowItem size={"small"}>
        <PortfolioEventLogo
          withAsset={true}
          assetDetails={assetDetails}
          icon={logoUrl}
        />
      </RowItem>
      <RowItem>
        <Center>{title}</Center>
      </RowItem>
      {amount !== null && (
        <RowItem>
          <Center>
            <RowItem size={"small"}>
              <Text sizeValue={"14"} color={color}>
                {amount} {currency}
              </Text>
            </RowItem>
            {percent !== null && (
              <RowItem>
                <Profitability
                  prefix={PROFITABILITY_PREFIX.SIGN}
                  variant={PROFITABILITY_VARIANT.CHIPS}
                  value={percent}
                >
                  {Math.abs(percent)} %
                </Profitability>
              </RowItem>
            )}
          </Center>
        </RowItem>
      )}
    </Row>
  );
};
export const EventTag = React.memo(_EventTag);
