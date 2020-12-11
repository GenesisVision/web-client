import AssetAvatar from "components/avatar/asset-avatar/asset-avatar";
import { AvatarWithName } from "components/avatar/avatar-with-name/avatar-with-name";
import { TagBlock } from "components/conversation/tag/tag.block";
import Link, { ToType } from "components/link/link";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { Text } from "components/text/text";
import Crashable from "decorators/crashable";
import React from "react";

import { AssetTagArrow, getAssetTagTextColor } from "./tag-components.helpers";
import { IAssetTagProps } from "./tag-components.types";

const _AssetTagCard: React.FC<IAssetTagProps & { url: ToType | string }> = ({
  url,
  assetDetails: {
    color: assetColor,
    changeState,
    price,
    change24Percent,
    logoUrl,
    title
  }
}) => {
  const color = getAssetTagTextColor(changeState);
  return (
    <TagBlock>
      <AvatarWithName
        size={"small"}
        avatar={
          <Link to={url}>
            <AssetAvatar
              color={assetColor}
              size={"xsmall"}
              url={logoUrl}
              alt={title}
            />
          </Link>
        }
        name={
          <Link to={url}>
            <Text muted wrap={false} size={"small"}>
              {title}
            </Text>
          </Link>
        }
      />
      {(price !== null || change24Percent !== null) && (
        <Row size={"small"}>
          {price !== null && (
            <RowItem wide>
              <Text size={"small"} wrap={false}>
                $ {price}
              </Text>
            </RowItem>
          )}
          {change24Percent !== null && (
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
                          <>&uarr;</>
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
export const AssetTagCard = React.memo(Crashable(_AssetTagCard));
