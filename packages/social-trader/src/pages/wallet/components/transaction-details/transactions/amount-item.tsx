import clsx from "clsx";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { DEFAULT_DECIMAL_SCALE } from "constants/constants";
import Crashable from "decorators/crashable";
import { AmountItem as AmountItemType, Color } from "gv-api-web";
import * as React from "react";
import NumberFormat from "react-number-format";
import { formatValue } from "utils/formatter";

import styles from "../transaction-details.module.scss";

const _AmountItem: React.FC<Props> = ({
  amount: { amount, currency, color }
}) => {
  return (
    <ColoredAmount color={color}>
      <Row>
        <RowItem size={"small"}>
          <NumberFormat
            value={formatValue(amount, DEFAULT_DECIMAL_SCALE)}
            allowNegative={true}
            displayType="text"
          />
        </RowItem>
        <RowItem size={"small"}>{currency}</RowItem>
      </Row>
    </ColoredAmount>
  );
};

const ColoredAmount: React.FC<{ color: Color } & React.HTMLAttributes<
  HTMLDivElement
>> = ({ color, children }) => {
  return (
    <div
      className={clsx({
        [styles["amount-item__amount--white"]]: color === "White",
        [styles["amount-item__amount--red"]]: color === "Red",
        [styles["amount-item__amount--green"]]: color === "Green"
      })}
    >
      {children}
    </div>
  );
};

interface Props {
  amount: AmountItemType;
}

const AmountItem = React.memo(Crashable(_AmountItem));
export default AmountItem;
