import DepositButton from "modules/deposit/deposit.button";
import WithdrawButton from "modules/withdraw/withdraw.button";
import React from "react";
import { TableCardRow } from "shared/components/table/components/table-card/table-card";
import { ASSET } from "shared/constants/constants";
import { CurrencyEnum } from "shared/utils/types";

const _DepositWithdrawButtons: React.FC<Props> = ({
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
      <DepositButton
        ownAsset={ownAsset}
        entryFee={entryFee}
        availableToInvest={availableToInvest}
        broker={broker}
        type={type}
        id={id}
        currency={currency}
      />
      <WithdrawButton type={type} id={id} currency={currency} />
    </TableCardRow>
  );
};

interface Props {
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
