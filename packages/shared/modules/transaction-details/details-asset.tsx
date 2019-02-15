import { ProgramTransactionDetails } from "gv-api-web";
import { GVProgramAvatar } from "gv-react-components";
import * as React from "react";

const TransactionAsset = (props: { data: ProgramTransactionDetails }) => {
  return (
    <div
      className={`transaction-asset transaction-asset--${props.data.programType.toLowerCase()}`}
    >
      <GVProgramAvatar
        url={props.data.logo}
        level={props.data.level > 0 ? props.data.level : undefined}
        alt={props.data.title}
        color={props.data.color}
      />
      <div className="transaction-asset__description">
        <p className="transaction-asset__title">{props.data.title}</p>
        <p className="transaction-asset__trader">{props.data.managerName}</p>
      </div>
    </div>
  );
};

export default TransactionAsset;
