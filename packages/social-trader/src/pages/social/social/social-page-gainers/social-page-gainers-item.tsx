import Profitability from "components/profitability/profitability";
import { PROFITABILITY_PREFIX } from "components/profitability/profitability.helper";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { SocialSearchContext } from "pages/social/social/social-page.context";
import React, { useCallback, useContext } from "react";
import { formatCurrencyValue } from "utils/formatter";

interface Props {
  title: string;
  price: number;
  change?: number;
}

const _SocialPageGainersItem: React.FC<Props> = ({ title, price, change }) => {
  const { searchValue, setSearchValue } = useContext(SocialSearchContext);

  const handleClick = useCallback(() => {
    const hashTag = `#${title.toLowerCase()}`;
    const hashTags = searchValue.hashTags.includes(hashTag)
      ? searchValue.hashTags
      : [...searchValue.hashTags, hashTag];
    setSearchValue({
      ...searchValue,
      hashTags
    });
  }, [searchValue, title]);
  return (
    <div>
      <Row onClick={handleClick}>{title}</Row>
      <Row>
        <RowItem>
          <b>{formatCurrencyValue(price, title)}</b>
        </RowItem>
        {change !== null && change !== undefined && (
          <RowItem>
            <b>
              <Profitability prefix={PROFITABILITY_PREFIX.SIGN} value={change}>
                {Math.abs(change)} %
              </Profitability>
            </b>
          </RowItem>
        )}
      </Row>
    </div>
  );
};

export const SocialPageGainersItem = React.memo(_SocialPageGainersItem);
