import GVProgramAvatar from "components/gv-program-avatar";
import Link, { ToType } from "components/link/link";
import { TransactionAssetDetails } from "gv-api-web";
import * as React from "react";
import { FUND_DETAILS_FOLDER_ROUTE } from "routes/funds.routes";
import { FOLLOW_DETAILS_FOLDER_ROUTE } from "routes/invest.routes";
import { PROGRAM_DETAILS_FOLDER_ROUTE } from "routes/programs.routes";
import {
  composeFollowDetailsUrl,
  composeFundsDetailsUrl,
  composeProgramDetailsUrl
} from "utils/compose-url";

const getAssetLink = (data: TransactionAssetDetails): ToType | undefined => {
  const state = "/ Wallet";
  switch (data.assetType) {
    case "Follow":
      return {
        state,
        pathname: FOLLOW_DETAILS_FOLDER_ROUTE,
        as: composeFollowDetailsUrl(data.url)
      };
    case "Fund":
      return {
        state,
        pathname: FUND_DETAILS_FOLDER_ROUTE,
        as: composeFundsDetailsUrl(data.url)
      };
    case "Program":
      return {
        state,
        pathname: PROGRAM_DETAILS_FOLDER_ROUTE,
        as: composeProgramDetailsUrl(data.url)
      };
  }
};

const _TransactionAsset: React.FC<Props> = ({ data, url }) => {
  const programLinkProps = getAssetLink(data);
  return (
    <div
      className={`transaction-asset transaction-asset--${data.assetType.toLowerCase()}`}
    >
      <Link to={programLinkProps}>
        <GVProgramAvatar
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
      <div className="transaction-asset__description">
        <Link to={programLinkProps} className="transaction-asset__title">
          {data.title}
        </Link>
        <p className="transaction-asset__trader">{data.manager}</p>
      </div>
    </div>
  );
};

interface Props {
  data: TransactionAssetDetails;
  url?: string;
}

const TransactionAsset = React.memo(_TransactionAsset);
export default TransactionAsset;
