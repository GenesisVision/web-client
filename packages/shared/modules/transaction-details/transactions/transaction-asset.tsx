import { ProgramTransactionDetails } from "gv-api-web";
import * as React from "react";
import GVProgramAvatar from "shared/components/gv-program-avatar";
import withUrl from "shared/decorators/with-url";

const TransactionAsset = ({ data, url }: Props) => (
  <div
    className={`transaction-asset transaction-asset--${data.programType.toLowerCase()}`}
  >
    <GVProgramAvatar
      url={url}
      level={data.level > 0 ? data.level : undefined}
      alt={data.title}
      color={data.color}
      levelProgress={data.levelProgress}
    />
    <div className="transaction-asset__description">
      <p className="transaction-asset__title">{data.title}</p>
      <p className="transaction-asset__trader">{data.managerName}</p>
    </div>
  </div>
);

export default withUrl<Props>("url")(React.memo(TransactionAsset));

interface Props {
  data: ProgramTransactionDetails;
  url?: string;
}
