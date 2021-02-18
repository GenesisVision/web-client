import React from "react";
import { Row } from "components/row/row";
import { RowItem } from "components/row-item/row-item";
import { Button } from "components/button/button";
import { SimpleNumberField } from "components/simple-fields/simple-number-field";
import NumberFormat from "react-number-format";
import { GVHookFormField } from "components/gv-hook-form-field";
import {
  CLOSE_POSITION_FIELDS,
  ClosePositionSubmitValues,
  IClosePositionFormValues
} from "pages/trade/binance-trade-page/trading/trading-tables/positions/close-position/close-position.helpers";
import { useForm } from "react-hook-form";
import { HookForm } from "utils/hook-form.helpers";
import { OrderType } from "pages/trade/binance-trade-page/trading/terminal.types";

export interface IClosePositionFormProps {
  price: number;
  amount: number;
}

interface Props extends IClosePositionFormProps {
  onSubmit: (values: ClosePositionSubmitValues) => Promise<any>;
}

const _ClosePosition: React.FC<Props> = ({ onSubmit, price, amount }) => {
  const form = useForm<IClosePositionFormValues>({
    defaultValues: {
      [CLOSE_POSITION_FIELDS.price]: price,
      [CLOSE_POSITION_FIELDS.amount]: amount
    },
    mode: "onChange"
  });

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
            onClick={handleButtonClick("Limit")}
            variant={"outlined"}
            size={"xsmall"}
          >
            Limit
          </Button>
        </RowItem>
        <RowItem size={"xsmall"}>
          <Button
            onClick={handleButtonClick("Market")}
            variant={"outlined"}
            size={"xsmall"}
          >
            Market
          </Button>
        </RowItem>
        <RowItem>
          <GVHookFormField
            name={CLOSE_POSITION_FIELDS.price}
            component={SimpleNumberField}
            InputComponent={NumberFormat}
            allowNegative={false}
          />
        </RowItem>
        <RowItem>
          <GVHookFormField
            name={CLOSE_POSITION_FIELDS.amount}
            component={SimpleNumberField}
            InputComponent={NumberFormat}
            allowNegative={false}
          />
        </RowItem>
      </Row>
    </HookForm>
  );
};

export const ClosePositionForm = React.memo(_ClosePosition);
