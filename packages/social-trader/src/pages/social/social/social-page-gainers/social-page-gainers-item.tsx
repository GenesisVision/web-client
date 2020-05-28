import Profitability from "components/profitability/profitability";
import { PROFITABILITY_PREFIX } from "components/profitability/profitability.helper";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { SocialSearchContext } from "pages/social/social/social-page.context";
import React, { useCallback, useContext } from "react";

interface Props {
  title: string;
  price: number;
  change: number;
}

const _SocialPageGainersItem: React.FC<Props> = ({ title, price, change }) => {
  const { setSearchValue } = useContext(SocialSearchContext);

  const handleClick = useCallback(() => {
    setSearchValue({ mask: title });
  }, [title]);
  return (
    <div>
      <Row onClick={handleClick}>{title}</Row>
      <Row>
        <RowItem>
          <b>{price}</b>
        </RowItem>
        <RowItem>
          <b>
            <Profitability prefix={PROFITABILITY_PREFIX.SIGN} value={change}>
              {change} %
            </Profitability>
          </b>
        </RowItem>
      </Row>
    </div>
  );
};

export const SocialPageGainersItem = React.memo(_SocialPageGainersItem);
