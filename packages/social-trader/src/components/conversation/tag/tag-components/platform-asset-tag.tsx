import {
  AssetTagArrow,
  getAssetTagTextColor,
  TagTitleRow
} from "components/conversation/tag/tag-components/tag-components.helpers";
import { TagBlock } from "components/conversation/tag/tag.block";
import { CurrencyItem } from "components/currency-item/currency-item";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { Text } from "components/text/text";
import React from "react";

import { IPlatformAssetTagProps } from "./tag-components.types";

const _PlatformAssetTagComponent: React.FC<IPlatformAssetTagProps> = ({
  platformAssetDetails: {
    change24Percent,
    changeState,
    price,
    name,
    logoUrl,
    url
  }
}) => {
  const color = getAssetTagTextColor(changeState);
  const hasPercent = change24Percent !== null;
  const hasData = price !== null || hasPercent;
  return (
    <TagBlock>
      <TagTitleRow>
        <CurrencyItem small name={name} url={url} logo={logoUrl} />
      </TagTitleRow>
      {hasData && (
        <Row size={"small"}>
          <RowItem wide>
            <Text size={"small"} wrap={false}>
              $ {price}
            </Text>
          </RowItem>
          {hasPercent && (
            <RowItem>
              <Text size={"small"} wrap={false} color={color}>
                <Row>
                  <RowItem size={"xsmall"}>{change24Percent}% </RowItem>
                  {changeState !== "NotChanged" && (
                    <AssetTagArrow>
                      <div>
                        {changeState === "Increased" ? (
                          <>&uarr;</>
                        ) : (
                          <>&darr;</>
                        )}
                      </div>
                    </AssetTagArrow>
                  )}
                </Row>
              </Text>
            </RowItem>
          )}
        </Row>
      )}
    </TagBlock>
  );
};
export const PlatformAssetTagComponent = React.memo(_PlatformAssetTagComponent);
