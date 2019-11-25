import GVProgramAvatar from "components/gv-program-avatar";
import { TransactionAssetDetails } from "gv-api-web";
import * as React from "react";

const _TransactionAsset: React.FC<Props> = ({ data, url }) => (
  <div
    className={`transaction-asset transaction-asset--${data.assetType.toLowerCase()}`}
  >
    <GVProgramAvatar
      url={url}
      level={
        data.programDetails && data.programDetails.level > 0
          ? data.programDetails.level
          : undefined
      }
      alt={data.title}
      color={data.color}
      levelProgress={data.programDetails && data.programDetails.levelProgress}
    />
    <div className="transaction-asset__description">
      <p className="transaction-asset__title">{data.title}</p>
      <p className="transaction-asset__trader">{data.manager}</p>
    </div>
  </div>
);

interface Props {
  data: TransactionAssetDetails;
  url?: string;
}

const TransactionAsset = React.memo(_TransactionAsset);
export default TransactionAsset;
