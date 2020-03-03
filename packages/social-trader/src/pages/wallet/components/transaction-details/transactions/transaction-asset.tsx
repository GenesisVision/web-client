import AssetAvatarWithName from "components/avatar/asset-avatar/asset-avatar-with-name";
import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import { TransactionAssetDetails } from "gv-api-web";
import * as React from "react";
import { getAssetLink } from "utils/compose-url";

const _TransactionAsset: React.FC<Props> = ({ data, url }) => {
  const { contextTitle } = useToLink();
  const programLinkProps = getAssetLink(data.url, data.assetType, contextTitle);
  return (
    <div className={`transaction-asset--${data.assetType.toLowerCase()}`}>
      <Link to={programLinkProps}>
        <AssetAvatarWithName
          name={
            <>
              <div className="transaction-asset__title">{data.title}</div>
              <div className="transaction-asset__trader">{data.manager}</div>
            </>
          }
          url={url}
          level={
            data.programDetails && data.programDetails.level > 0
              ? data.programDetails.level
              : undefined
          }
          alt={data.title}
          color={data.color}
          levelProgress={
            data.programDetails && data.programDetails.levelProgress
          }
        />
      </Link>
    </div>
  );
};

interface Props {
  data: TransactionAssetDetails;
  url?: string;
}

const TransactionAsset = React.memo(_TransactionAsset);
export default TransactionAsset;
