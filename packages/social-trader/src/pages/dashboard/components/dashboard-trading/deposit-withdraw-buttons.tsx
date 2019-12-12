import { TableCardRow } from "components/table/components/table-card/table-card";
import DepositButton from "modules/deposit/deposit.button";
import WithdrawButton from "modules/withdraw/withdraw.button";
import React from "react";
import { ASSET } from "shared/constants/constants";
import { CurrencyEnum } from "utils/types";

const _DepositWithdrawButtons: React.FC<Props> = ({
  title,
  onApply,
  canWithdraw,
  canInvest,
  ownAsset,
  entryFee,
  availableToInvest,
  broker,
  type,
  id,
  currency
}) => {
  return (
    <TableCardRow>
      {canInvest && (
        <DepositButton
          title={title}
          onApply={onApply}
          ownAsset={ownAsset}
          entryFee={entryFee}
          availableToInvest={availableToInvest}
          broker={broker}
          type={type}
          id={id}
          currency={currency}
        />
      )}
      {canWithdraw && (
        <WithdrawButton
          onApply={onApply}
          type={type}
          id={id}
          currency={currency}
        />
      )}
    </TableCardRow>
  );
};

interface Props {
  title: string;
  onApply?: VoidFunction;
  canWithdraw?: boolean;
  canInvest?: boolean;
  ownAsset?: boolean;
  entryFee?: number;
  availableToInvest?: number;
  broker: string;
  type: ASSET;
  id: string;
  currency: CurrencyEnum;
}

const DepositWithdrawButtons = React.memo(_DepositWithdrawButtons);
export default DepositWithdrawButtons;
