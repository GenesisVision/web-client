import { ProgramTransactionDetails } from "gv-api-web";
import * as React from "react";
import GVProgramAvatar from "shared/components/gv-program-avatar";
import withUrl from "shared/decorators/with-url";

const TransactionAsset = (props: OwnProps) => {
  return (
    <div
      className={`transaction-asset transaction-asset--${props.data.programType.toLowerCase()}`}
    >
      <GVProgramAvatar
        url={props.url}
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

export default withUrl<OwnProps>("url")(TransactionAsset);

interface OwnProps {
  data: ProgramTransactionDetails;
  url?: string;
}
