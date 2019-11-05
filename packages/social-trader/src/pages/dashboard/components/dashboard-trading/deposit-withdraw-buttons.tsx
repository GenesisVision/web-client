import DepositButton from "modules/deposit/deposit.button";
import WithdrawButton from "modules/withdraw/withdraw.button";
import React from "react";
import { TableCardRow } from "shared/components/table/components/table-card/table-card";
import { ASSET } from "shared/constants/constants";
import { CurrencyEnum } from "shared/utils/types";

const _DepositWithdrawButtons: React.FC<Props> = props => {
  return (
    <TableCardRow>
      <DepositButton
        type={props.type}
        id={props.id}
        currency={props.currency}
      />
      <WithdrawButton
        type={props.type}
        id={props.id}
        currency={props.currency}
      />
    </TableCardRow>
  );
};

interface Props {
  type: ASSET;
  id: string;
  currency: CurrencyEnum;
}

const DepositWithdrawButtons = React.memo(_DepositWithdrawButtons);
export default DepositWithdrawButtons;
