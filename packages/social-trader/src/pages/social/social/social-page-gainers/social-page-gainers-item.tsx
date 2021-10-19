import { CurrencyItem } from "components/currency-item/currency-item";
import Profitability from "components/profitability/profitability";
import { PROFITABILITY_PREFIX } from "components/profitability/profitability.helper";
import { Row } from "components/row/row";
import { RowItem } from "components/row-item/row-item";
import { Text } from "components/text/text";
import {
  FeedContext,
  SocialSearchInitialState
} from "pages/social/social/feed.context";
import React, { useCallback, useContext } from "react";
import NumberFormat from "react-number-format";
import { formatCurrencyValue } from "utils/formatter";

interface Props {
  logoUrl: string;
  title: string;
  price: number;
  change?: number;
}

const _SocialPageGainersItem: React.FC<Props> = ({
  logoUrl,
  title,
  price,
  change
}) => {
  const { setSearchValue } = useContext(FeedContext);

  const handleClick = useCallback(() => {
    const hashTag = `#${title.toLowerCase()}`;
    const hashTags = [hashTag];
    setSearchValue({
      ...SocialSearchInitialState,
      hashTags
    });
  }, [title]);
  return (
    <div>
      <Row>
        <RowItem size={"small"}>
          <Text size={"xsmall"}>
            <CurrencyItem symbol={title} small logo={logoUrl} />
          </Text>
        </RowItem>
        <RowItem onClick={handleClick}>
          <Text size={"small"}>{title}</Text>
        </RowItem>
      </Row>
      <Row>
        <RowItem>
          <Text size={"small"}>
            <NumberFormat
              value={formatCurrencyValue(price, title)}
              thousandSeparator={" "}
              displayType="text"
              prefix={"$ "}
            />
          </Text>
        </RowItem>
        {change !== null && change !== undefined && (
          <RowItem>
            <Text size={"small"}>
              <Profitability prefix={PROFITABILITY_PREFIX.SIGN} value={change}>
                {Math.abs(change)} %
              </Profitability>
            </Text>
          </RowItem>
        )}
      </Row>
    </div>
  );
};

export const SocialPageGainersItem = React.memo(_SocialPageGainersItem);
