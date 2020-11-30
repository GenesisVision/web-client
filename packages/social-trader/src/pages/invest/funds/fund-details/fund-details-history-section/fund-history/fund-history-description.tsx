import FundAssetContainer from "components/fund-asset/fund-asset-container";
import { FundAssetPartWithIcon, FundHistoryEventType } from "gv-api-web";
import React from "react";

export interface IFundHistoryDescriptionProps {
  type: FundHistoryEventType;
  description: string;
  assets: Array<FundAssetPartWithIcon>;
}

const _FundHistoryDescription: React.FC<IFundHistoryDescriptionProps> = ({
  type,
  description,
  assets
}) => {
  switch (type) {
    case "Reallocation":
    case "Creation":
      return (
        <FundAssetContainer
          noWrap
          assets={assets}
          type={"short"}
          size={11}
          length={assets.length}
          hasPopoverList
        />
      );
    default:
      return <>{description}</>;
  }
};

export const FundHistoryDescription = React.memo(_FundHistoryDescription);
