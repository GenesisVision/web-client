import { FUND_ASSET_TYPE } from "components/fund-asset/fund-asset";
import FundAssetContainer from "components/fund-asset/fund-asset-container";
import { FundAssetPartWithIcon, FundHistoryEventType } from "gv-api-web";
import React from "react";
import { useTranslation } from "react-i18next";

export interface IFundHistoryDescriptionProps {
  amount: number;
  name: string;
  type: FundHistoryEventType;
  reallocateAssets: Array<FundAssetPartWithIcon>;
}

const _FundHistoryDescription: React.FC<IFundHistoryDescriptionProps> = ({
  amount,
  name,
  reallocateAssets,
  type
}) => {
  const [t] = useTranslation();
  switch (type) {
    case "Creation":
      return <>{t("Creation")}</>;
    case "Investment":
      return <>{t(`Investment into the fund ${amount} GVT`)}</>;
    case "Withdrawal":
      return <>{t(`Withdrawal from the fund ${amount} GVT`)}</>;
    case "Rebalance":
      return <>{t("Fund was rebalanced")}</>;
    case "Reallocation":
      return (
        <FundAssetContainer
          noWrap
          assets={reallocateAssets}
          type={FUND_ASSET_TYPE.SHORT}
          size={13}
          length={reallocateAssets.length}
          hasPopoverList
        />
      );
    case "ChallengeWinner":
      return <>{t(`Fund ${name} is a week's GV Funds Challenge winner`)}</>;
    default:
      return null;
  }
};

export const FundHistoryDescription = React.memo(_FundHistoryDescription);
