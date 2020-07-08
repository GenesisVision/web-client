import { CurrencyItem } from "components/currency-item/currency-item";
import Profitability from "components/profitability/profitability";
import { PROFITABILITY_PREFIX } from "components/profitability/profitability.helper";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import {
  FeedContext,
  SocialSearchInitialState
} from "pages/social/social/feed.context";
import styles from "pages/social/social/social-page-gainers/social-page-gainers.module.scss";
import React, { useCallback, useContext } from "react";
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
      <Row className={styles["social-page-gainers__item-label"]}>
        <RowItem size={"small"}>
          <CurrencyItem symbol={title} small logo={logoUrl} />
        </RowItem>
        <RowItem onClick={handleClick}>{title}</RowItem>
      </Row>
      <Row className={styles["social-page-gainers__item-value"]}>
        <RowItem>{formatCurrencyValue(price, title)}</RowItem>
        {change !== null && change !== undefined && (
          <RowItem>
            <Profitability prefix={PROFITABILITY_PREFIX.SIGN} value={change}>
              {Math.abs(change)} %
            </Profitability>
          </RowItem>
        )}
      </Row>
    </div>
  );
};

export const SocialPageGainersItem = React.memo(_SocialPageGainersItem);
