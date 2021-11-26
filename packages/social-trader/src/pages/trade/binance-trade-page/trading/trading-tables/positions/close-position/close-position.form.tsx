import { Button } from "components/button/button";
import { GVHookFormField } from "components/gv-hook-form-field";
import { Row } from "components/row/row";
import { RowItem } from "components/row-item/row-item";
import { SimpleNumberField } from "components/simple-fields/simple-number-field";
import styles from "pages/trade/binance-trade-page/trading/place-order/place-order.module.scss";
import { OrderType } from "pages/trade/binance-trade-page/trading/terminal.types";
import React from "react";
import { useForm } from "react-hook-form";
import NumberFormat from "react-number-format";
import { allowValuesNumberFormat } from "utils/helpers";
import { HookForm } from "utils/hook-form.helpers";

import { FilterValues } from "../../../place-order/place-order.types";
import {
  formatValueWithTick,
  getDecimalScale
} from "../../../terminal.helpers";

export interface IClosePositionFormProps {
  price: number;
  quantity: number;
}

export enum CLOSE_POSITION_FIELDS {
  price = "price",
  quantity = "quantity"
}

export interface IClosePositionFormValues {
  [CLOSE_POSITION_FIELDS.price]: number;
  [CLOSE_POSITION_FIELDS.quantity]: number;
}

export interface ClosePositionSubmitValues extends IClosePositionFormValues {
  type: OrderType;
}

interface Props extends IClosePositionFormProps {
  filterValues: FilterValues;
  isPending: boolean;
  onSubmit: (values: ClosePositionSubmitValues) => Promise<any>;
}

const _ClosePosition: React.FC<Props> = ({
  onSubmit,
  isPending,
  price: outerPrice,
  quantity: outerQuantity,
  filterValues
}) => {
  const form = useForm<IClosePositionFormValues>({
    defaultValues: {
      [CLOSE_POSITION_FIELDS.price]: +formatValueWithTick(
        outerPrice,
        filterValues.tickSize
      ),
      [CLOSE_POSITION_FIELDS.quantity]: Math.abs(outerQuantity)
    },
    mode: "onChange"
  });

  const { watch } = form;
  const { price, quantity } = watch();

  const handleButtonClick = (type: OrderType) => {
    return form.handleSubmit((values: IClosePositionFormValues) => {
      return onSubmit({ ...values, type });
    });
  };

  return (
    <HookForm form={form}>
      <Row wide>
        <RowItem size={"xsmall"}>
          <Button
            onClick={handleButtonClick("Market")}
            variant={"outlined"}
            disabled={!+quantity || isPending}
            size={"xsmall"}
            className={styles["place-order__mini-button"]}
          >
            Market
          </Button>
        </RowItem>
        <RowItem size={"xsmall"}>
          <Button
            onClick={handleButtonClick("Limit")}
            disabled={!+quantity || !+price || isPending}
            variant={"outlined"}
            size={"xsmall"}
            className={styles["place-order__mini-button"]}
          >
            Limit
          </Button>
        </RowItem>
        <RowItem>
          <GVHookFormField
            name={CLOSE_POSITION_FIELDS.price}
            component={SimpleNumberField}
            InputComponent={NumberFormat}
            decimalScale={getDecimalScale(filterValues.tickSize)}
            // isAllowed={allowValuesNumberFormat({
            //   from: 0,
            //   to: filterValues.maxPrice
            // })}
            // rules={noRequiredMinMaxNumberRules({
            //   max: filterValues.maxPrice,
            //   withMessage: false
            // })}
            allowNegative={false}
          />
        </RowItem>
        <RowItem>
          <GVHookFormField
            name={CLOSE_POSITION_FIELDS.quantity}
            component={SimpleNumberField}
            InputComponent={NumberFormat}
            decimalScale={getDecimalScale(filterValues.stepSize)}
            // isAllowed={allowValuesNumberFormat({
            //   from: 0,
            //   to: filterValues.marketMaxQuantity
            // })}
            allowNegative={false}
          />
        </RowItem>
      </Row>
    </HookForm>
  );
};

export const ClosePositionForm = React.memo(_ClosePosition);
